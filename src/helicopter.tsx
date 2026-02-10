import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { Mesh, Object3D } from "three";
import type { MyObject3D } from "./types";
import { useEffect, useRef } from "react";

const Helicopter = ({
  target,
}: {
  target: React.RefObject<MyObject3D | null>;
}) => {
  const loadedModel = useGLTF("/car/helicopter.glb").scene;
  const modelRef = useRef<Object3D | null>(null);

  useEffect(() => {
    if (!modelRef.current) return;

    modelRef.current.position.y = 1.5;

    modelRef.current.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;

        if (child.name.includes("HeliTop")) {
          gsap.to(child.rotation, {
            y: "+=6.2830",
            duration: 1,
            repeat: -1,
            ease: "linear",
          });
        }

        if (child.name.includes("Back_R")) {
          gsap.to(child.rotation, {
            x: "+=6.2830",
            duration: 0.5,
            repeat: -1,
            ease: "linear",
          });
        }
      }
    });

    gsap.to(modelRef.current.position, {
      y: "+=0.5",
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, []);

  useFrame(() => {
    if (modelRef.current && target?.current) {
      modelRef.current.children[0].lookAt(target.current.position);
    }
  });

  return <primitive ref={modelRef} object={loadedModel} />;
};

export default Helicopter;
