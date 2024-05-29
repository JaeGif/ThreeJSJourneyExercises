import Experience from './Experience';

export default class Camera {
  // singleton is a class that will instantiate normally on the first instance,
  // and return the first instance every time after
  constructor() {
    this.experience = new Experience();
  }
}
