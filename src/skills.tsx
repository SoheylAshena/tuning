import { useFBX } from "@react-three/drei";

const Skills = () => {
  const model = useFBX("/models/skills.fbx");
  return <primitive object={model} />;
};

export default Skills;
