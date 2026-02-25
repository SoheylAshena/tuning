import { useThree } from "@react-three/fiber";
import { AudioListener } from "three";

export function useGlobalAudioListener() {
  const { camera } = useThree();
  if (!camera.children.some((child) => child instanceof AudioListener)) {
    const globalListener = new AudioListener();
    camera.add(globalListener);
  }
  return camera.children.find(
    (child) => child instanceof AudioListener,
  ) as AudioListener;
}
