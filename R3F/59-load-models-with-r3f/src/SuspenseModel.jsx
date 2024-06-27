import React from 'react';

function SuspenseModel(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshBasicMaterial color={'blue'} wireframe />
    </mesh>
  );
}

export default SuspenseModel;
