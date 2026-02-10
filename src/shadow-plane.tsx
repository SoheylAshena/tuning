import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, Object3D } from "three";

const ShadowPlane = ({
  target,
}: {
  target: React.RefObject<Object3D | null>;
}) => {
  const planeRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!target.current || !planeRef.current) return;

    const carPos = target.current.position;

    // keep light offset relative to car
    planeRef.current.position.set(carPos.x, carPos.y, carPos.z);

    // shadow camera follows car
    planeRef.current.position.copy(carPos);
  });

  return (
    <mesh ref={planeRef} rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <shadowMaterial opacity={0.8} />
    </mesh>
  );
};

export default ShadowPlane;
