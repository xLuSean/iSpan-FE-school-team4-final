import { useGLTF } from '@react-three/drei';

export function Bar(props) {
  const { nodes, materials } = useGLTF('/3d-object/gym_props._barberll.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials['bar_c.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_7.geometry}
        material={materials['bar_2_c.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_9.geometry}
        material={materials['bar_a.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_11.geometry}
        material={materials['bar_b.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_13.geometry}
        material={materials['bolt.001']}
      />
    </group>
  );
}

export function PlateXS(props) {
  const { nodes, materials } = useGLTF('/3d-object/gym_props._barberll.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_15.geometry}
        material={materials['1.25kg_b']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_16.geometry}
        material={materials['1.25kg_a']}
      />
    </group>
  );
}

export function PlateSM(props) {
  const { nodes, materials } = useGLTF('/3d-object/gym_props._barberll.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_24.geometry}
        material={materials['2.5kg_b']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_25.geometry}
        material={materials['2.5kg_a']}
      />
    </group>
  );
}

export function PlateMD(props) {
  const { nodes, materials } = useGLTF('/3d-object/gym_props._barberll.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_27.geometry}
        material={materials['5kg_b']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_28.geometry}
        material={materials['5kg_a']}
      />
    </group>
  );
}

export function PlateLG(props) {
  const { nodes, materials } = useGLTF('/3d-object/gym_props._barberll.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_18.geometry}
        material={materials['10kg_b']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_19.geometry}
        material={materials['10kg_a']}
      />
    </group>
  );
}

export function PlateXL(props) {
  const { nodes, materials } = useGLTF('/3d-object/gym_props._barberll.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_21.geometry}
        material={materials['15kg_b']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_22.geometry}
        material={materials['15kg_a']}
      />
    </group>
  );
}

export function Collar(props) {
  const { nodes, materials } = useGLTF('/3d-object/gym_props._barberll.glb');

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.clamp}
        position={[0.711, 0, -0.468]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.01}
      />
    </group>
  );
}

export const BarBell = (props) => (
  <group {...props}>
    <Bar />
    <PlateXL position={[-0.68, 0, -0.4]} rotation={[0, 1.5, 0]} />
    <PlateXL position={[-0.72, 0, -0.4]} rotation={[0, 1.5, 0]} />
    <PlateXL position={[-0.76, 0, -0.4]} rotation={[0, 1.5, 0]} />
    <PlateXL position={[-0.8, 0, -0.4]} rotation={[0, 1.5, 0]} />
    <PlateLG position={[-0.865, 0, 0]} rotation={[0, 1.5, 0]} />
    <PlateMD position={[-0.915, 0, 0.28]} rotation={[0, 1.5, 0]} />
    <PlateXL position={[0.72, 0, -0.4]} rotation={[0, 1.5, 0]} />
    <PlateXL position={[0.76, 0, -0.4]} rotation={[0, 1.5, 0]} />
    <PlateXL position={[0.8, 0, -0.4]} rotation={[0, 1.5, 0]} />
    <PlateXL position={[0.84, 0, -0.4]} rotation={[0, 1.5, 0]} />
    <PlateLG position={[0.85, 0, 0]} rotation={[0, 1.5, 0]} />
    <PlateMD position={[0.865, 0, 0.28]} rotation={[0, 1.5, 0]} />
  </group>
);

export const PlateRing = (props) => (
  <group {...props}>
    <PlateLG position={[0.48, 0, 0]} rotation={[0, 0.5, 0]} />
    <PlateLG position={[0.33, 0.33, 0]} rotation={[-0.33, 0.33, 0]} />
    <PlateLG position={[-0.33, 0.33, 0]} rotation={[-0.33, -0.33, 0]} />
    <PlateLG position={[0, 0.48, 0]} rotation={[-0.5, 0, 0]} />
    <PlateLG position={[-0.33, -0.33, 0]} rotation={[0.33, -0.33, 0]} />
    <PlateLG position={[0, -0.48, 0]} rotation={[0.5, 0, 0]} />
    <PlateLG position={[0.33, -0.33, 0]} rotation={[0.33, 0.33, 0]} />
    <PlateLG position={[-0.48, 0, 0]} rotation={[0, -0.5, 0]} />
  </group>
);

useGLTF.preload('/3d-object/gym_props._barberll.glb');
