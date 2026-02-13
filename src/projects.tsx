import { useFBX } from "@react-three/drei";

const Projects = () => {
  const model = useFBX("/models/projects.fbx");
  return <primitive object={model} />;
};

export default Projects;
