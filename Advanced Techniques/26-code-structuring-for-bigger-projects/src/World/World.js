import Experience from '../Experience/Experience';
import Environment from './Environment';
import * as THREE from 'three';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.resources = this.experience.resources;
    this.resources.on('ready', () => {
      // setup env after resources are ready
      this.environment = new Environment();
    });
  }
}
