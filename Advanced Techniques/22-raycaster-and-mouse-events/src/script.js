import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

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
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
);
object1.position.x = -2;

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
);

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
);
object3.position.x = 2;

scene.add(object1, object2, object3);
// first need position of the mouse - 1 to 1 in axes

const cursorPosition = {};
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (e) => {
  // some browsers fire mousemove fater than the framerate for unknown reasons
  mouse.x = (e.clientX / sizes.width) * 2 - 1;
  mouse.y = -((e.clientY / sizes.height) * 2 - 1);
});

window.addEventListener('click', (e) => {
  if (currentIntersection) console.log(currentIntersection);
});
// Raycaster
const raycaster = new THREE.Raycaster();

const raycasterOrigin = new THREE.Vector3(-3, 0, 0);
const raycasterDirection = new THREE.Vector3(1, 0, 0).normalize();

const objectsToTest = [object1, object2, object3];

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
camera.position.z = 3;
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
let currentIntersection = null;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // animated object position

  object1.position.y = Math.sin(elapsedTime);
  object2.position.y = Math.sin(elapsedTime + Math.PI / 4);
  object3.position.y = Math.sin(elapsedTime + Math.PI / 2);
  raycaster.setFromCamera(mouse, camera);

  const intersections = raycaster.intersectObjects(objectsToTest);

  for (const object of objectsToTest) {
    object.material.color.set('#ff0000');
  }
  for (const intersection of intersections) {
    intersection.object.material.color.set('#0000ff');
  }

  if (intersections.length) {
    // something is hovered, get only first one
    if (currentIntersection === null) {
      // mouse entered
      currentIntersection = intersections[0];
    }
  } else currentIntersection = null; // mouse left

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
