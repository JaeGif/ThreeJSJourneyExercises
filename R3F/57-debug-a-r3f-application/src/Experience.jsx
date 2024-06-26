import { OrbitControls } from '@react-three/drei';
import { button, useControls } from 'leva';
import { Perf } from 'r3f-perf';

export default function Experience() {
  const { perfVisible } = useControls({ perfVisible: true });
  const { position, color } = useControls({
    position: {
      value: { x: -2, y: 0, z: 0 },
      step: 0.001,
    },
    color: '#ff0000',
    visible: true,
    interval: {
      min: 0,
      max: 10,
      value: [4, 6],
    },
    clickMe: button(() => {
      console.log('hi');
    }),
  });

  return (
    <>
      {perfVisible && <Perf position='top-left' />}
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position={[position.x, position.y, position.z]}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position-x={2} scale={1.5}>
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
