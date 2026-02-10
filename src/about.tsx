import { useGLTF } from "@react-three/drei";

const About = () => {
  const model = useGLTF("/car/about.glb").scene;
  return <primitive object={model} />;
};

export default About;
