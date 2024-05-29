import Experience from '../Experience/Experience';
import Environment from './Environment';
import * as THREE from 'three';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // setup env
    this.environment = new Environment();
  }
}
