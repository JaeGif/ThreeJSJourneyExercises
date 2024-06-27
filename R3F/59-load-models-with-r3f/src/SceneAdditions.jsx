import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';

function SceneAdditions() {
  return (
    <>
      <Perf position='top-left' />
      <OrbitControls makeDefault />
    </>
  );
}

export default SceneAdditions;
