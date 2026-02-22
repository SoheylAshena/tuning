import { useFrame, useThree } from "@react-three/fiber";
import type { MyObject3D } from "./types";

const FollowCamera = ({ target }: { target: React.RefObject<MyObject3D> }) => {
  const { camera } = useThree();

  useFrame(() => {
    if (!target.current) return;

    const carPosition = target.current.position;

    camera.position.set(
      carPosition.x - 12,
      carPosition.y + 4,
      carPosition.z + 7,
    );

    camera.lookAt(carPosition.x, carPosition.y + 2.5, carPosition.z + 2);
  });

  return null;
};

export default FollowCamera;
