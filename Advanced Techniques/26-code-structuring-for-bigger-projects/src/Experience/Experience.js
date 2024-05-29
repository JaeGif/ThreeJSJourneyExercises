import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';
import World from '../World/World';
import * as THREE from 'three';
import Resources from './Utils/Resources';
import sources from './sources';

let instance = null;
// Experience is a Singleton
export default class Experience {
  constructor(canvas) {
    // singleton pattern
    if (instance) return instance;
    instance = this;

    // FIRST INSTANTIATION
    // provides global access to the experience
    window.experience = this;
    // options
    this.canvas = canvas;

    // setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    // resize event
    this.sizes.on('resize', () => {
      this.resize();
    });

    // tick event

    this.time.on('tick', () => {
      this.update();
    });
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    // ORDER MATTERS
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
}
