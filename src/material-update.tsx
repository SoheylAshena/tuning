import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh, MeshMatcapMaterial } from "three";

const MaterialUpdate = () => {
  const { scene } = useThree();
  const goldTexture = useTexture("/matcap/gold.png", (texture) => {
    texture.colorSpace = "srgb";
  });
  const blackTexture = useTexture("/matcap/black.png", (texture) => {
    texture.colorSpace = "srgb";
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child instanceof Mesh)) return;

      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material];

      const newMats = mats.map((mat) => {
        if (!mat?.name) return mat;

        if (mat.name.toLowerCase().includes("black")) {
          return new MeshMatcapMaterial({
            side: 2,
            matcap: blackTexture,
          });
        }

        if (mat.name.toLowerCase().includes("gold")) {
          return new MeshMatcapMaterial({
            side: 2,
            matcap: goldTexture,
          });
        }

        return mat;
      });

      child.material = newMats.length === 1 ? newMats[0] : newMats;
      child.material.needsUpdate = true;
    });
  }, [scene, goldTexture, blackTexture]);

  return null;
};

export default MaterialUpdate;
