import { useFrame } from "@react-three/fiber";
import { clamp, lerp } from "three/src/math/MathUtils.js";
import { useFBX } from "@react-three/drei";
import type { MyObject3D } from "../types";
import { Quaternion, Vector3 } from "three";
import { useEffect } from "react";
import { useKeyboardContext } from "../hooks/use-keyboard-context";
import { useEngineSound } from "../hooks/use-engine-sound";
import useCarHorn from "../hooks/use-car-horn-sound";

const PlayerCar = ({
  ref,
  paused,
}: {
  ref: React.RefObject<MyObject3D>;
  paused: boolean;
}) => {
  // ----- Loading the car model -----
  const model = useFBX("/models/lambo.fbx");

  // ----- Get keyboard input status
  const keys = useKeyboardContext();

  // ----- Engine sound -----
  useEngineSound(ref);

  // ----- Horn sound -----
  useCarHorn(ref);

  // ----- Constants for car movement -----
  const ACCELERATION = 0.002;
  const FRICTION = 0.97;
  const MAX_SPEED = 1;
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

  useFrame((_, delta) => {
    if (!ref.current || paused) return;

    // Apply delta time multiplier for frame-rate independent movement
    const EXPECTED_FRAME_TIME = 1.0 / 60.0; // 60fps baseline
    const deltaMult = delta / EXPECTED_FRAME_TIME;

    // ---------------- Limit car movement -----------------
    if (ref.current.position.z <= -2) {
      ref.current.position.z = -2;
      ref.current.speed = lerp(ref.current.speed, 0, 0.1 * deltaMult);
    }
    if (ref.current.position.z >= 100) {
      ref.current.position.z = 100;
      ref.current.speed = lerp(ref.current.speed, 0, 0.1 * deltaMult);
    }

    /* ---------------- ACCELERATION ---------------- */
    if (keys.current.forward)
      ref.current.speed = Math.min(
        +MAX_SPEED,
        ref.current.speed + ACCELERATION * deltaMult,
      );

    if (keys.current.backward)
      ref.current.speed = Math.max(
        -MAX_SPEED,
        ref.current.speed - ACCELERATION * deltaMult,
      );

    if (!(keys.current.forward || keys.current.backward))
      ref.current.speed *= Math.pow(FRICTION, deltaMult);

    /* ---------- FORWARD MOVEMENT ---------- */
    forward.set(0, 0, 1);
    forward.applyQuaternion(tempQuat);
    forward.multiplyScalar(ref.current.speed);

    ref.current.position.set(
      ref.current.position.x + forward.x * deltaMult,
      ref.current.position.y,
      ref.current.position.z + forward.z * deltaMult,
    );

    /* ---------------- WHEEL SPIN ---------------- */
    ref.current.wheels.forEach((wheel) => {
      wheel.rotation.x += ref.current!.speed * deltaMult;
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
        0.1 * deltaMult,
      );
    }
  });

  return <primitive ref={ref} object={model} />;
};

export default PlayerCar;
