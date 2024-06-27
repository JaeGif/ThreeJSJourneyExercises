import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture, // these are dependent on a 3rd party gh page
} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import * as THREE from 'three';

// native THREE.js to make things to reuse
const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const torusMaterial = new THREE.MeshMatcapMaterial();

export default function Experience() {
  /*   const donutsGroupRef = useRef();
   */
  const donuts = useRef([]);

  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 1024);

  /*  
    const [torusGeometry, setTorusGeometry] = useState();
    const [torusMaterial, setTorusMaterial] = useState();
  */

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;
    torusMaterial.matcap = matcapTexture;
    torusMaterial.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    /*     donutsGroupRef.current.children.map((el) => {
      el.rotation.y += delta * 0.3;
    }); */

    for (const donut of donuts.current) {
      donut.rotation.y += delta;
    }
  });

  return (
    <>
      <Perf position='top-left' />
      <OrbitControls makeDefault />
      {/* 
      <torusGeometry ref={setTorusGeometry} />
      <meshMatcapMaterial ref={setTorusMaterial} matcap={matcapTexture} />
 */}
      <Center>
        <Text3D
          font={'./fonts/helvetiker_regular.typeface.json'}
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Hello, Callista
          <meshNormalMaterial />
        </Text3D>
      </Center>
      {/*       <group ref={donutsGroupRef}>
       */}
      {[...Array(100)].map((element, i) => (
        <mesh
          ref={(el) => {
            donuts.current[i] = el;
          }}
          geometry={torusGeometry}
          material={torusMaterial}
          key={uniqid()}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
      {/*       </group>
       */}
    </>
  );
}
