import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import {
  ACESFilmicToneMapping,
  LinearDisplayP3ColorSpace,
  SRGBColorSpace,
} from 'three';

const root = ReactDOM.createRoot(document.querySelector('#root'));
// r3f hooks mostly only work in the canvas
// therefore we make a r3f component to contain the experience

root.render(
  <Canvas
    dpr={[1, 2]}
    gl={{
      antialias: true,
      toneMapping: ACESFilmicToneMapping,
      outputColorSpace: SRGBColorSpace,
    }}
    camera={{
      fov: 45,
      near: 0.01,
      far: 200,
      position: [3, 2, 6],
    }}
  >
    <Experience />
  </Canvas>
);
