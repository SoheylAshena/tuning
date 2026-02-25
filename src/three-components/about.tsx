import { useFBX } from "@react-three/drei";

const About = () => {
  const model = useFBX("/models/about.fbx");

  return <primitive object={model} />;
};

export default About;
