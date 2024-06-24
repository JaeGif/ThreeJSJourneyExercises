import React, { useRef } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import CustomObject from './CustomObject';

extend({ OrbitControls: OrbitControls });

function Experience() {
  // create and handle meshes
  // try not to animate or update geom values too much is
  //   ... super laggy
  const ref = useRef();
  const cubeRef = useRef();
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    /*     const angle = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(angle) * 8;
    state.camera.position.z = Math.cos(angle) * 8;
    state.camera.lookAt(0, 0, 0); */
    // called regardless of framerate
    // fix framerate variances across different computers
    // ref.current.rotation.y += delta;
    cubeRef.current.rotation.y += delta;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <group ref={ref}>
        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color={'#ff33ee'} />
        </mesh>

        <mesh position-x={-1.5}>
          <sphereGeometry />
          <meshStandardMaterial color={'orange'} />
        </mesh>
      </group>
      <mesh rotation-x={-Math.PI / 2} scale={10} position-y={-1}>
        <planeGeometry />
        <meshStandardMaterial color={'greenyellow'} side={2} />
      </mesh>

      <CustomObject />
    </>
  );
}

export default Experience;
