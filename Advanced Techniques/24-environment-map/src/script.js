import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

/**
 * Base
 */
// Debug
const gui = new GUI();
// Canvas
const canvas = document.querySelector('canvas.webgl');
// loader

const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

// Scene
const scene = new THREE.Scene();

// env map
// LDR Cube Text
/* scene.environmentIntensity = 1;
scene.backgroundBlurriness = 0;
const environmentMap = cubeTextureLoader.load([
    './environmentMaps/0/px.png',
    './environmentMaps/0/nx.png',
    './environmentMaps/0/py.png',
    './environmentMaps/0/ny.png',
    './environmentMaps/0/pz.png',
    './environmentMaps/0/nz.png',
  ]); 
  
  
scene.background = environmentMap;
scene.environment = environmentMap;

*/
// HDRi mean high dynamic range image
// has very high range of color beyond the visible light
// hdris contain a 360 view of the scene
// needs an rgbe loader (how hdrs are encoded)

const textureLoader = new THREE.TextureLoader();
const environmentMap = textureLoader.load(
  '/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg'
);

environmentMap.mapping = THREE.EquirectangularReflectionMapping;
environmentMap.colorSpace = THREE.SRGBColorSpace;
scene.background = environmentMap;
scene.environment = environmentMap;

/* ;

const rgbeLoader = new RGBELoader();
rgbeLoader.load('./environmentMaps/blender-2k.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = environmentMap;
});
 */

gui.add(scene, 'environmentIntensity').min(0).max(10).step(0.001);
gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001);
gui.add(scene, 'backgroundIntensity').min(0).max(10).step(0.001);
gui
  .add(scene.backgroundRotation, 'y')
  .min(0)
  .max(Math.PI * 2)
  .step(0.001)
  .name('bg rotation');
gui
  .add(scene.environmentRotation, 'y')
  .min(0)
  .max(Math.PI * 2)
  .step(0.001)
  .name('env rotation');

gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);
});

/* const ambientLight = new THREE.AmbientLight('#ff0', 3);
scene.add(ambientLight); */
/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 1,
    color: '0xaaaaaa',
  })
);
torusKnot.position.y = 4;
torusKnot.position.x = -4;

scene.add(torusKnot);

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
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
