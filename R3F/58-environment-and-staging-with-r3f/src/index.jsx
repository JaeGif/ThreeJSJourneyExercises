import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import * as THREE from 'three';
const root = ReactDOM.createRoot(document.querySelector('#root'));

const created = (state) => {
  /*   console.log(state);
  state.gl.setClearColor('#ff0000');
  state.scene.background = new THREE.Color('red'); */
};
root.render(
  <Canvas
    shadows
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [-4, 3, 6],
    }}
    onCreated={created}
  >
    <color args={['ivory']} attach={'background'} />
    <Experience />
  </Canvas>
);
