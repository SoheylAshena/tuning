import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { AudioContext } from "three";
import type { MyObject3D } from "./types";

const FollowCamera = ({ target }: { target: React.RefObject<MyObject3D> }) => {
  const { camera, gl } = useThree();

  const isLocked = useRef(false);

  useEffect(() => {
    const canvas = gl.domElement;

    const onClick = () => {
      canvas.requestPointerLock();
      AudioContext.getContext().resume();
    };

    const onLockChange = () => {
      isLocked.current = document.pointerLockElement === canvas;
    };

    canvas.addEventListener("click", onClick);
    document.addEventListener("pointerlockchange", onLockChange);

    return () => {
      canvas.removeEventListener("click", onClick);
      document.removeEventListener("pointerlockchange", onLockChange);
    };
  }, [gl]);

  useFrame(() => {
    if (!target.current) return;
    const carPosition = target.current.position;

    // --- 4. Camera position
    camera.position.set(
      carPosition.x - 12,
      carPosition.y + 5,
      carPosition.z + 8,
    );

    // --- 5. Smooth follow
    camera.lookAt(carPosition.x, carPosition.y + 2.5, carPosition.z + 2);
  });

  return null;
};

export default FollowCamera;
