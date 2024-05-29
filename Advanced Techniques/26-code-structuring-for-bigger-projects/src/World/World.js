import Experience from '../Experience/Experience';
import Environment from './Environment';
import Fox from './Fox';
import * as THREE from 'three';
import Floor from './Floor';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.resources = this.experience.resources;
    this.resources.on('ready', () => {
      // setup env after resources are ready
      // ORDER MATTERS
      this.floor = new Floor();
      this.fox = new Fox();
      this.environment = new Environment();
    });
  }
  update() {
    if (this.fox) this.fox.update();
  }
}
