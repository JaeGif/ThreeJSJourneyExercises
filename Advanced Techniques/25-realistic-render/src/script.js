import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (child.isMesh) {
      // Activate shadow here
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

/**
 * Environment map
 */
// Intensity
scene.environmentIntensity = 1;
gui.add(scene, 'environmentIntensity').min(0).max(10).step(0.001);

// HDR (RGBE) equirectangular
rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});
// directional light

// texture loader
const textureLoader = new THREE.TextureLoader();
const castleARM = textureLoader.load(
  './textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg'
);
const castleDiff = textureLoader.load(
  './textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg'
);
const castleNor = textureLoader.load(
  './textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.jpg'
);

castleDiff.colorSpace = THREE.SRGBColorSpace;

const woodARM = textureLoader.load(
  './textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg'
);
const woodDiff = textureLoader.load(
  './textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg'
);
const woodNor = textureLoader.load(
  './textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.jpg'
);
woodDiff.colorSpace = THREE.SRGBColorSpace;
// floor | wall

const wall = new THREE.Mesh(
  new THREE.PlaneGeometry(8, 8, 12, 12),
  new THREE.MeshStandardMaterial({
    map: castleDiff,
    aoMap: castleARM,
    roughnessMap: castleARM,
    metalnessMap: castleARM,
    normalMap: castleNor,
  })
);
wall.position.set(0, 4, -4);

scene.add(wall);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(8, 8, 12, 12),
  new THREE.MeshStandardMaterial({
    map: woodDiff,
    aoMap: woodARM,
    roughnessMap: woodARM,
    metalnessMap: woodARM,
    normalMap: woodNor,
  })
);
floor.position.set(0, 0, 0);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);
// wall

const directionalLight = new THREE.DirectionalLight('#ffffff', 6);

directionalLight.position.set(-4, 6.5, 2.5);
directionalLight.target.position.set(0, 4, 0);
directionalLight.target.updateWorldMatrix();
scene.add(directionalLight);
gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001);
gui
  .add(directionalLight.position, 'x')
  .min(-10)
  .max(10)
  .step(0.001)
  .name('lightX');
gui
  .add(directionalLight.position, 'y')
  .min(-10)
  .max(10)
  .step(0.001)
  .name('lightY');
gui
  .add(directionalLight.position, 'z')
  .min(-10)
  .max(10)
  .step(0.001)
  .name('lightZ');

// shadows
directionalLight.castShadow = true;
directionalLight.shadow.normalBias = 0.027;
directionalLight.shadow.bias = -0.004;
gui.add(directionalLight, 'castShadow');
gui
  .add(directionalLight.shadow, 'normalBias')
  .min(-0.05)
  .max(0.05)
  .step(0.0001);
gui.add(directionalLight.shadow, 'bias').min(-0.05).max(0.05).step(0.0001);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.mapSize.set(256, 256);

/* // helpers
const directionalLightCHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);

scene.add(directionalLightCHelper); */
/**
 * Models
 */
// Helmet

gltfLoader.load('/models/hamburger.glb', (gltf) => {
  gltf.scene.scale.set(0.5, 0.5, 0.5);

  scene.add(gltf.scene);

  updateAllMaterials();
});
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight + 1,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight + 1;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // set antialias only on screens with lower pixel ratios to preserve performance
  antialias: window.devicePixelRatio <= 2 ? true : false,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
// tone mapping
// tone mapping is basically faking an HDR from an LDR by mapping colors
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 3;

// toneMapping testing
gui.add(renderer, 'toneMapping', {
  No: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping,
});
gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001);

/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
