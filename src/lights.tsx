import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { DirectionalLight, Object3D } from "three";

const Lights = ({ target }: { target: React.RefObject<Object3D | null> }) => {
  const lightRef = useRef<DirectionalLight>(null!);

  useFrame(() => {
    if (!target.current || !lightRef.current) return;

    const carPos = target.current.position;

    // keep light offset relative to car
    lightRef.current.position.set(carPos.x + 10, carPos.y + 15, carPos.z + 10);

    // shadow camera follows car
    lightRef.current.target.position.copy(carPos);
    lightRef.current.target.updateMatrixWorld();
  });

  return (
    <directionalLight
      ref={lightRef}
      castShadow
      shadow-mapSize={[4096, 4096]}
      shadow-camera-near={1}
      shadow-camera-far={50}
      shadow-camera-left={-50}
      shadow-camera-right={50}
      shadow-camera-top={50}
      shadow-camera-bottom={-50}
    />
  );
};

export default Lights;
