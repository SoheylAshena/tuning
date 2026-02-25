import { useLoader } from "@react-three/fiber";
import { AudioLoader } from "three";

const useAudio = (path: string) => {
  return useLoader(AudioLoader, path);
};

export default useAudio;
