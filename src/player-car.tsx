import { useFrame } from "@react-three/fiber";
import { clamp, lerp } from "three/src/math/MathUtils.js";
import { useKeyboard } from "./use-keyboard";
import { useFBX } from "@react-three/drei";
import { useEngineSound } from "./use-engine-sound";
import type { MyObject3D } from "./types";
import { Quaternion, Vector3 } from "three";
import { useEffect } from "react";

const PlayerCar = ({ ref }: { ref: React.RefObject<MyObject3D> }) => {
  // ----- Loading the car model -----
  const model = useFBX("/models/car.fbx");

  // ----- Get keyboard input status
  const keys = useKeyboard();

  // ----- Constants for car movement -----
  const ACCELERATION = 0.05;
  const FRICTION = 0.97;
  const MAX_SPEED = 0.5;
  const forward = new Vector3();
  const tempQuat = new Quaternion();

  useEffect(() => {
    // ----- Assign visual ref -----
    const car = ref.current;

    car.speed = 0;
    car.wheels = [];
    car.carBody = null;

    car.traverse((child) => {
      if (!car) return;

      if (child.name.toLowerCase().includes("wheel")) car.wheels.push(child);

      if (child.name.toLowerCase().includes("body")) {
        car.carBody = child;
      }
    });
  }, [ref]);

  useEngineSound(ref);

  useFrame((_, delta) => {
    if (!ref.current) return;

    // ---------------- Limit car movement -----------------
    if (ref.current.position.z <= -2) {
      ref.current.position.z = -2;
      ref.current.speed = lerp(ref.current.speed, 0, delta * 10);
    }
    if (ref.current.position.z >= 50) {
      ref.current.position.z = 50;
      ref.current.speed = lerp(ref.current.speed, 0, delta * 10);
    }

    /* ---------------- ACCELERATION ---------------- */
    if (keys.current.forward)
      ref.current.speed = Math.min(
        +MAX_SPEED,
        ref.current.speed + ACCELERATION * delta,
      );

    if (keys.current.backward)
      ref.current.speed = Math.max(
        -MAX_SPEED,
        ref.current.speed - ACCELERATION * delta,
      );

    if (!(keys.current.forward || keys.current.backward))
      ref.current.speed *= FRICTION;

    /* ---------- FORWARD MOVEMENT ---------- */
    forward.set(0, 0, 1);
    forward.applyQuaternion(tempQuat);
    forward.multiplyScalar(ref.current.speed);

    ref.current.position.set(
      ref.current.position.x + forward.x,
      ref.current.position.y,
      ref.current.position.z + forward.z,
    );

    /* ---------------- WHEEL SPIN ---------------- */
    ref.current.wheels.forEach((wheel) => {
      wheel.rotation.x += ref.current!.speed;
    });

    /* ---------------- BODY TILT ---------------- */
    if (ref.current.carBody) {
      let targetTilt = clamp(ref.current.speed * -2, -0.02, 0.02);

      const movingForward = ref.current.speed > 0;
      const movingBackward = ref.current.speed < 0;

      const pressingForward = keys.current.forward;
      const pressingBackward = keys.current.backward;

      if (
        (movingForward && pressingBackward) ||
        (movingBackward && pressingForward)
      ) {
        targetTilt = -targetTilt;
      }

      if (!(pressingForward || pressingBackward)) {
        targetTilt = 0;
      }

      ref.current.carBody.rotation.x = lerp(
        ref.current.carBody.rotation.x,
        targetTilt,
        0.1,
      );
    }
  });

  return <primitive ref={ref} object={model} />;
};

export default PlayerCar;
