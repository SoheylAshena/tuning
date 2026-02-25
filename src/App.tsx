import { useEffect, useRef, useState } from "react";
import type { MyObject3D } from "./types";
import { AudioContext } from "three";
import { KeyboardProvider } from "./context/keyboard-context";
import WebGLCanvas from "./three-components/web-gl-canvas";
import PlayerCar from "./three-components/player-car";
import Hello from "./three-components/hello";
import About from "./three-components/about";
import Helicopter from "./three-components/helicopter";
import Skills from "./three-components/skills";
import Projects from "./three-components/projects";
import FollowCamera from "./three-components/follow-camera";
import { OrbitControls } from "@react-three/drei";
import MaterialUpdate from "./three-components/material-update";
import { HornButton } from "./components/car-horn";
import GaugeLoader from "./components/gauge-loader";

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
