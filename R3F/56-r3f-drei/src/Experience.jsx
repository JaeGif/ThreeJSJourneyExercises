import {
  OrbitControls,
  PivotControls,
  TransformControls,
  Html,
} from '@react-three/drei';
import { useRef } from 'react';

export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();

  return (
    <>
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        scale={0.5}
        axisColors={['#9381ff', '#ff4d6d', '#7ae582']} // x | y | z
      >
        <mesh ref={sphereRef} position-x={-2}>
          <Html
            occlude={[sphereRef, cubeRef]}
            center
            position={[0, 1, 1]}
            wrapperClass='label'
            distanceFactor={8}
          >
            That's a sphere 👍
          </Html>

          <sphereGeometry />
          <meshStandardMaterial color='orange' />
        </mesh>
      </PivotControls>

      <mesh ref={cubeRef} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color='mediumpurple' />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color='greenyellow' />
      </mesh>

      {/* Controls */}
      <OrbitControls makeDefault />
      <TransformControls object={cubeRef} />
    </>
  );
}
