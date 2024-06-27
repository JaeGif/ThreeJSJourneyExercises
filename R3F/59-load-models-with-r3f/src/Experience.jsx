// import Model from './Model';
import SceneAdditions from './SceneAdditions';
import { Suspense } from 'react';
import SuspenseModel from './SuspenseModel';
import { Model } from './Hamburger';
import Fox from './Fox';

export default function Experience() {
  return (
    <>
      <SceneAdditions />

      <directionalLight
        shadow-normalBias={0.04}
        castShadow
        position={[1, 2, 3]}
        intensity={4.5}
      />
      <ambientLight intensity={1.5} />

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color='greenyellow' />
      </mesh>

      <Suspense
        fallback={
          <SuspenseModel
            position-y={0.5}
            color={'aquamarine'}
            scale={[2, 3, 2]}
          />
        }
      >
        <Fox />
      </Suspense>
    </>
  );
}
