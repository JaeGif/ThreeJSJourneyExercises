import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
} from '@react-three/drei';

import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';

export default function Experience() {
  const dirLightRef = useRef();
  const cube = useRef();
  const { color, opacity, blur } = useControls('contact shadows', {
    color: '#000000',
    opacity: { value: 0.5, min: 0, max: 1 },
    blur: { value: 1, min: 0, max: 10 },
  });
  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
    cube.current.position.x = 2 + Math.sin(state.clock.elapsedTime);
  });

  useHelper(dirLightRef, THREE.DirectionalLightHelper, 1, 'red');

  return (
    <>
      <Perf position='top-left' />
      <OrbitControls makeDefault />

      {/*       <AccumulativeShadows
        position={[0, -0.999, 0]}
        scale={10}
        color='#316d39'
        opacity={0.8}
        frames={100}
        temporal
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={3}
          bias={0.001}
          position={[1, 2, 3]}
        />
      </AccumulativeShadows>
 */}
      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
      />
      <directionalLight
        shadow-mapSize={[1024, 1024]}
        shadow-camera-top={5}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        castShadow
        ref={dirLightRef}
        position={[1, 2, 3]}
        intensity={4.5}
      />
      <ambientLight intensity={1.5} />
      <Sky sunPosition={[1, 2, 3]} />
      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color='orange' />
      </mesh>
      <mesh castShadow ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color='mediumpurple' />
      </mesh>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color='greenyellow' />
      </mesh>
    </>
  );
}
