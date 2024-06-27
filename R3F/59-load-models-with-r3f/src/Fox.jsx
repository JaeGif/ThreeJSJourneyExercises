import React, { useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
function Fox() {
  const fox = useGLTF('./Fox/glTF/Fox.gltf');
  const animations = useAnimations(fox.animations, fox.scene);

  useEffect(() => {
    const action = animations.actions.Run;
    window.setTimeout(() => {
      animations.actions.Walk.play();
      animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);
    }, 2000);
    action.play();
  }, []);

  return (
    <primitive
      object={fox.scene}
      scale={0.02}
      rotation-y={0.3}
      position={[0, -1, 0]}
    />
  );
}

export default Fox;
