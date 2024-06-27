import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { useGLTF, Clone } from '@react-three/drei';

useGLTF.preload('./hamburger-draco.glb'); // add preload outside of the fn

function Model() {
  /*   const model = useLoader(GLTFLoader, './hamburger.glb', (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./draco/');
    loader.setDRACOLoader(dracoLoader);
  }); */

  const model = useGLTF('./hamburger-draco.glb');
  // clone for using thre same model multiple times
  // primitve for using one model one time
  return (
    <>
      <Clone object={model.scene} scale={0.35} position-x={-4} />
      <Clone object={model.scene} scale={0.35} position-x={0} />
      <Clone object={model.scene} scale={0.35} position-x={4} />
    </>
  );
}

export default Model;
