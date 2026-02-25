import { useEffect, useMemo } from "react";
import type { MyObject3D } from "../types";
import useAudio from "./use-audio";
import { useGlobalAudioListener } from "./use-global-audio-listener";
import { PositionalAudio } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardContext } from "./use-keyboard-context";

const useCarHorn = (target: React.RefObject<MyObject3D>) => {
  const keys = useKeyboardContext();
  const listener = useGlobalAudioListener();
  const hornSound = useAudio("/honk.mp3");

  const audio = useMemo(() => {
    if (!listener || !hornSound) return null;

    const newAudio = new PositionalAudio(listener);
    newAudio.setBuffer(hornSound);
    newAudio.setLoop(true);
    newAudio.setPlaybackRate(1);
    newAudio.setVolume(10);

    return newAudio;
  }, [listener, hornSound]);

  useEffect(() => {
    if (!audio || !target.current) return;

    const object = target.current;
    object.add(audio);

    return () => {
      audio.stop();
      object.remove(audio);
      audio.disconnect();
    };
  }, [audio, target]);

  useFrame(() => {
    if (!audio || !target.current) return;

    if (keys.current.horn && !audio.isPlaying) {
      audio.play();
    } else if (!keys.current.horn && audio.isPlaying) {
      audio.stop();
    }
  });
};

export default useCarHorn;
