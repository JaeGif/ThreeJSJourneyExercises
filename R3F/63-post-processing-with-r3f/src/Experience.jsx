import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import {
  ToneMapping,
  EffectComposer,
  Vignette,
  Glitch,
  Noise,
  Bloom,
  DepthOfField,
} from '@react-three/postprocessing';
import { GlitchMode, ToneMappingMode } from 'postprocessing';
import { BlendFunction } from 'postprocessing';
import Drunk from './Drunk';
import { useRef } from 'react';

export default function Experience() {
  const drunkRef = useRef();
  return (
    <>
      <color args={['#ffffff']} attach={'background'} />

      <EffectComposer multisampling={8}>
        {/*         <Vignette
          offset={0.3}
          darkness={0.6}
          blendFunction={BlendFunction.NORMAL}
        />
        <Glitch
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.05, 0.2]}
          mode={GlitchMode.SPORADIC}
        />
        <Noise blendFunction={BlendFunction.SOFT_LIGHT} premultiply /> */}
        {/*         <Bloom mipmapBlur luminanceThreshold={1.1} />
         */}
        {/*         <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        /> */}
        <Drunk frequency={2} amplitude={0.1} ref={drunkRef} />

        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
      <Perf position='top-left' />
      <OrbitControls makeDefault />
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color={'orange'} />
      </mesh>
      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color={'mediumpurple'} />
      </mesh>
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color='greenyellow' />
      </mesh>
    </>
  );
}
