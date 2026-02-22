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

const App = () => {
  const carRef = useRef<MyObject3D>(null!);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement !== canvasRef.current) {
        setPaused(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handlePlay = () => {
    if (!canvasRef.current) return;

    AudioContext.getContext().resume();
    canvasRef.current.requestFullscreen();

    setPaused(false);
  };

  return (
    <div className="w-full h-screen relative">
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

      <WebGLCanvas ref={canvasRef}>
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

      <GaugeLoader />
    </div>
  );
};

export default App;
