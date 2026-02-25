import { useFBX } from "@react-three/drei";

const Hello = () => {
  const model = useFBX("/models/hello.fbx");

  return (
    <>
      <primitive object={model} />
    </>
  );
};

export default Hello;
