import { useRef, useState, useEffect } from "react";
import WebGLCanvas from "./web-gl-canvas";
import PlayerCar from "./player-car";
import type { MyObject3D } from "./types";
import Hello from "./hello";
import Helicopter from "./helicopter";
import FollowCamera from "./follow-camera";
import About from "./about";
import MaterialUpdate from "./material-update";
import { OrbitControls } from "@react-three/drei";
import Projects from "./projects";
import GaugeLoader from "./gauge-loader";
import Skills from "./skills";
import { AudioContext } from "three";
import { HornButton } from "./car-horn";
import { KeyboardProvider } from "./keyboard-context";

const App = () => {
  const carRef = useRef<MyObject3D>(null!);
  const mainDivRef = useRef<HTMLDivElement | null>(null);

  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement !== mainDivRef.current) {
        setPaused(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handlePlay = () => {
    if (!mainDivRef.current) return;

    AudioContext.getContext().resume();
    mainDivRef.current.requestFullscreen();

    setPaused(false);
  };

  return (
    <KeyboardProvider>
      <div className="w-full h-screen relative" ref={mainDivRef}>
        {/* Pause Overlay */}
        {paused && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
            <button
              onClick={handlePlay}
              className="text-3xl px-8 py-4  text-white rounded-lg"
            >
              Play
            </button>
          </div>
        )}

        <WebGLCanvas>
          <PlayerCar paused={paused} ref={carRef} />
          <Hello />
          <About />
          <Helicopter target={carRef} />
          <Skills />
          <Projects />

          <FollowCamera target={carRef} />
          <OrbitControls />
          <MaterialUpdate />
        </WebGLCanvas>
        <HornButton />

        <GaugeLoader />
      </div>
    </KeyboardProvider>
  );
};

export default App;
