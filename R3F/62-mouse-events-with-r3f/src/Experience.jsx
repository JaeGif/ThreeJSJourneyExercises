import { useFrame } from '@react-three/fiber';
import { OrbitControls, meshBounds, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';

export default function Experience() {
  const cube = useRef();

  const model = useGLTF('./hamburger.glb');

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const eventHandler = () => {
    console.log('event');
  };

  return (
    <>
      <Perf position='top-left' />

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color='orange' />
      </mesh>

      <mesh
        raycast={meshBounds}
        ref={cube}
        position-x={2}
        scale={1.5}
        onPointerEnter={eventHandler}
        onPointerLeave={eventHandler}
      >
        {' '}
        <boxGeometry />
        <meshStandardMaterial color='mediumpurple' />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color='greenyellow' />
      </mesh>

      <primitive object={model.scene} scale={0.25} position={[0, 0.5, 0]} />
    </>
  );
}
