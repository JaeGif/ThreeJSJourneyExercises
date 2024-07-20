import { OrbitControls, useGLTF } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import {
  Physics,
  RigidBody,
  CuboidCollider,
  BallCollider,
  CylinderCollider,
} from '@react-three/rapier';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Experience() {
  const cubeRef = useRef(null);
  const twisterRef = useRef(null);
  const hamburger = useGLTF('./hamburger.glb');

  const [hitSound] = useState(() => new Audio('./hit.mp3'));

  const cubeJump = () => {
    const cubeMass = cubeRef.current.mass();
    cubeRef.current.applyImpulse({ x: 0, y: 5 * cubeMass, z: 0 });

    cubeRef.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  useFrame((state, delta) => {
    let time = state.clock.elapsedTime;
    // quaternion sucks so make euler, convert to quaternion and the send quaternion to fn
    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);

    twisterRef.current.setNextKinematicRotation(quaternionRotation);
    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twisterRef.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
  });

  const collisionEnter = () => {
    console.log('bonk');
    hitSound.currentTime = 0;
    hitSound.volume = Math.random() + 0.1;
    hitSound.play();
  };
  return (
    <>
      <Perf position='top-left' />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics debug gravity={[0, -9.08, 0]}>
        <RigidBody colliders='hull' restitution={0}>
          <primitive
            object={hamburger.scene}
            scale={0.25}
            position={[0, 4, 0]}
          />
        </RigidBody>
        <RigidBody colliders='ball'>
          <mesh castShadow position={[-2, 5, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color='orange' />
          </mesh>
        </RigidBody>
        <RigidBody
          ref={cubeRef}
          colliders={false}
          onCollisionEnter={collisionEnter}
        >
          <mesh onClick={cubeJump} castShadow>
            <boxGeometry />
            <meshStandardMaterial color='mediumpurple' />
          </mesh>
          <CuboidCollider mass={0.5} args={[0.5, 0.5, 0.5]} />
        </RigidBody>
        <RigidBody
          ref={twisterRef}
          position={[0, -0.8, 0]}
          friction={0}
          type='kinematicPosition'
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color='red' />
          </mesh>
        </RigidBody>
        <RigidBody type='fixed'>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color='greenyellow' />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
