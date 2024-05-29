import Sizes from './Utils/Sizes';
import Time from './Utils/Time';

export default class Experience {
  constructor(canvas) {
    // provides global access to the experience
    window.experience = this;
    // options
    this.canvas = canvas;

    // setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.sizes.on('resize', () => {
      this.resize();
    });
  }
  resize() {}
}
