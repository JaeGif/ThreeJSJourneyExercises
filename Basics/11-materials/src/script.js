import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// Debug

const gui = new GUI();
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight + 1,
};

// Textures
const textureLoader = new THREE.TextureLoader();
const doorColor = textureLoader.load('./textures/door/color.jpg');
const doorAlpha = textureLoader.load('./textures/door/alpha.jpg');
const doorAmbientOcclusion = textureLoader.load(
  './textures/door/ambientOcclusion.jpg'
);
const doorHeight = textureLoader.load('./textures/door/height.jpg');
const doorNormal = textureLoader.load('./textures/door/normal.jpg');
const doorMetalness = textureLoader.load('./textures/door/metalness.jpg');
const doorRoughness = textureLoader.load('./textures/door/roughness.jpg');
const matcap = textureLoader.load('./textures/matcaps/1.png');
const gradient = textureLoader.load('./textures/gradients/3.jpg');

doorColor.colorSpace = THREE.SRGBColorSpace;
matcap.colorSpace = THREE.SRGBColorSpace;

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

// Mesh
/* const basicMaterial = new THREE.MeshBasicMaterial({
  map: doorColor,
}); */
// Lights

/* const ambientLight = new THREE.AmbientLight('#ffffff', 1);
const pointLight = new THREE.PointLight('#ffffff', 30);
pointLight.position.set(2, 3, 4);
scene.add(ambientLight, pointLight); */

const material = new THREE.MeshPhysicalMaterial();
material.roughness = 1;
material.metalness = 1;

material.map = doorColor;
material.aoMap = doorAmbientOcclusion;
material.aoMapIntensity = 1;
material.transparent = true;
material.alphaMap = doorAlpha;
material.normalMap = doorNormal;
material.normalScale.set(0.5, 0.5);
material.metalnessMap = doorMetalness;
material.displacementMap = doorHeight;
material.displacementScale = 0.1;
material.roughnessMap = doorRoughness;

gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);

const sphereGeometry = new THREE.SphereGeometry(1.5, 20, 20);
const planeGeometry = new THREE.PlaneGeometry(2, 2, 64, 64);
const torusGeometry = new THREE.TorusGeometry(1, 0.5, 20, 20);

const sphereMesh = new THREE.Mesh(sphereGeometry, material);
const planeMesh = new THREE.Mesh(planeGeometry, material);
const torusMesh = new THREE.Mesh(torusGeometry, material);

sphereMesh.position.x = -5;

torusMesh.position.x = 5;

scene.add(sphereMesh, planeMesh, torusMesh);

const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/environmentMap/2k.hdr', (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = envMap;
  scene.environment = envMap;
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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
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
  const elapsedTime = clock.getElapsedTime();

  sphereMesh.rotation.y = 0.1 * elapsedTime;
  sphereMesh.rotation.x = -0.15 * elapsedTime;

  planeMesh.rotation.y = 0.1 * elapsedTime;
  planeMesh.rotation.x = -0.15 * elapsedTime;

  torusMesh.rotation.y = 0.1 * elapsedTime;
  torusMesh.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
