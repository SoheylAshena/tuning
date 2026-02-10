import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { AudioListener, AudioLoader, PositionalAudio } from "three";
import type { MyObject3D } from "./types";
import { useEffect, useMemo } from "react";

export const useEngineSound = (target: React.RefObject<MyObject3D>) => {
  const { camera } = useThree();

  const engineSound = useLoader(AudioLoader, "/engine2.wav");

  const listener = useMemo(() => {
    const newListener = new AudioListener();
    camera.add(newListener);
    return newListener;
  }, [camera]);

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

    const volume = speed * 50;
    const pitch = speed * 2 + 0.5;

    audio.setVolume(volume);
    audio.setPlaybackRate(pitch);

    if (speed > 0.001 && !audio.isPlaying) {
      audio.play();
    }
  });
};
