import { useFrame } from "@react-three/fiber";
import { PositionalAudio } from "three";
import type { MyObject3D } from "./types";
import { useEffect, useMemo } from "react";
import { useGlobalAudioListener } from "./use-global-audio-listener";
import useAudio from "./use-audio";

export const useEngineSound = (target: React.RefObject<MyObject3D>) => {
  const engineSound = useAudio("/engine2.wav");

  const listener = useGlobalAudioListener();

  const audio = useMemo(() => {
    const newAudio = new PositionalAudio(listener);
    newAudio.setBuffer(engineSound);
    newAudio.setLoop(true);
    newAudio.setPlaybackRate(1);
    return newAudio;
  }, [listener, engineSound]);

  useEffect(() => {
    target.current.add(audio);
  }, [audio, target]);

  useFrame(() => {
    if (!audio || !target.current) return;

    const speed = Math.abs(target.current.speed);

    const volume = speed * 100;
    const pitch = speed * 2 + 0.5;

    audio.setVolume(volume);
    audio.setPlaybackRate(pitch);

    if (speed > 0.001 && !audio.isPlaying) {
      audio.play();
    }
  });
};
