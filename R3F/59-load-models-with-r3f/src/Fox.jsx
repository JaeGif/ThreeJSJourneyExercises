import React, { useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useControls } from 'leva';

function Fox() {
  const fox = useGLTF('./Fox/glTF/Fox.gltf');
  const animations = useAnimations(fox.animations, fox.scene);

  const { animationName } = useControls({
    animationName: { options: animations.names },
  });

  useEffect(() => {
    const action = animations.actions[animationName];
    action.fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5).play();
    };
  }, [animationName]);

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
