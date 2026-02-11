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
      if (child instanceof Mesh) {
        if (child.material.name.includes("white")) {
          child.material = new MeshMatcapMaterial({
            side: 2,
            matcap: blackTexture,
          });
        }

        if (child.material.name.includes("Gold")) {
          child.material = new MeshMatcapMaterial({
            side: 2,
            matcap: goldTexture,
          });
        }
      }
    });
  }, [scene, goldTexture, blackTexture]);

  return null;
};

export default MaterialUpdate;
