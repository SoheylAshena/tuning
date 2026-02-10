import { useGLTF } from "@react-three/drei";

const Hello = () => {
  const { scene } = useGLTF("/car/hello.glb");

  return (
    <>
      <primitive object={scene} />
    </>
  );
};

export default Hello;
