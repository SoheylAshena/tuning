import { useFBX } from "@react-three/drei";

const Projects = () => {
  const model = useFBX("/models/project.fbx");
  return <primitive object={model} />;
};

export default Projects;
