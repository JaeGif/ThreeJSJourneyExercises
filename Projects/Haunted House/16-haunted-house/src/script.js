import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Timer } from 'three/addons/misc/Timer.js';
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
// units are 1m
// therefore tetmp width of scene is maybe 10m

// Textures
const textureLoader = new THREE.TextureLoader();
// Floor Textures
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg');
const floorColorTexture = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg'
);
const floorARMTexture = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg'
);
const floorNormalTexture = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg'
);
const floorDisplacementTexture = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg'
);
floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;
floorColorTexture.colorSpace = THREE.SRGBColorSpace;

floorARMTexture.repeat.set(8, 8);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

floorNormalTexture.repeat.set(8, 8);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

floorDisplacementTexture.repeat.set(8, 8);
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

// Walls

const wallColorTexture = textureLoader.load(
  './wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg'
);
const wallARMTexture = textureLoader.load(
  './wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg'
);
const wallNormalTexture = textureLoader.load(
  './wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg'
);
wallColorTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * House
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    normalMap: floorNormalTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2,
  })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// CONSTANTS
const ZFIGHTINGADJUST = 0.0001;
// House

// House group
const houseGroup = new THREE.Group();
scene.add(houseGroup);

// Walls

const wallDimensions = {
  width: 4,
  height: 4,
  depth: 4,
};
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(
    wallDimensions.width,
    wallDimensions.height,
    wallDimensions.depth
  ),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  })
);
walls.position.y += wallDimensions.height / 2;
houseGroup.add(walls);

// Roof
const roofDimensions = {
  radius: 3.5,
  height: 1.5,
};
// rafter added independently
const rafterDimensions = {
  height: 0.5,
  width: wallDimensions.width + 0.1,
  depth: wallDimensions.depth + 0.1,
};
const rafter = new THREE.Mesh(
  new THREE.BoxGeometry(
    rafterDimensions.height,
    rafterDimensions.width,
    rafterDimensions.depth
  ),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  })
);
rafter.position.y += wallDimensions.height + rafterDimensions.height / 2;
rafter.rotation.z = Math.PI / 2;
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(roofDimensions.radius, roofDimensions.height, 4),
  new THREE.MeshStandardMaterial()
);
roof.rotation.y += Math.PI / 4;
roof.position.y +=
  wallDimensions.height +
  roofDimensions.height / 2 +
  rafterDimensions.height / 2;

// Door
// Texture is a square
const doorDimensions = {
  height: 2.2,
  width: 2.2,
};
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(doorDimensions.width, doorDimensions.height),
  new THREE.MeshStandardMaterial({ color: 'red' })
);
door.position.z = wallDimensions.depth / 2 + ZFIGHTINGADJUST;
door.position.y = doorDimensions.height / 2;

houseGroup.add(roof, rafter, door);

// Bushes
const baseBushDimensions = {
  radius: 1,
};
const bushGeometry = new THREE.SphereGeometry(
  baseBushDimensions.radius,
  16,
  16
);

const bushMaterial = new THREE.MeshStandardMaterial();

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);

bush1.scale.setScalar(0.5);
bush1.position.set(0.8, 0.2, 2.2);

bush2.scale.setScalar(0.25);
bush2.position.set(1.4, 0.1, 2.1);

bush3.scale.setScalar(0.15);
bush3.position.set(-1, 0.05, 2.6);

bush4.scale.setScalar(0.4);
bush4.position.set(-0.8, 0.1, 2.2);

houseGroup.add(bush1, bush2, bush3, bush4);

// Graves
const gravesGroup = new THREE.Group();
scene.add(gravesGroup);

// Needs to be distributed randomly not in the walls
const graveDimensions = { width: 0.6, height: 0.8, depth: 0.2 };
const graveGeometry = new THREE.BoxGeometry(
  graveDimensions.width,
  graveDimensions.height,
  graveDimensions.depth
);
const graveMaterial = new THREE.MeshStandardMaterial();

for (let i = 0; i < 15; i++) {
  const angle = Math.random() * 2 * Math.PI;
  const radius = 4 + Math.random() * 3;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = x;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = z;
  grave.rotation.set(
    (Math.random() - 0.5) * 0.4,
    (Math.random() - 0.5) * 0.4,
    (Math.random() - 0.5) * 0.4
  );
  // position the grave randomly in a circle around the house like a donut distribution

  gravesGroup.add(grave);
}
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

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
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
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
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
