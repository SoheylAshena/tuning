import { useRef } from "react";
import WebGLCanvas from "./web-gl-canvas";
import PlayerCar from "./player-car";
import { OrbitControls } from "@react-three/drei";
import type { MyObject3D } from "./types";
import Hello from "./hello";
import Helicopter from "./helicopter";
import FloorPlane from "./floor-plane";
import FollowCamera from "./follow-camera";
import About from "./about";
import MaterialUpdate from "./material-update";

const App = () => {
  const carRef = useRef<MyObject3D>(null!);

  return (
    <div className="w-full h-screen">
      <WebGLCanvas>
        <OrbitControls />

        <PlayerCar ref={carRef} />
        <Hello />
        <About />
        <Helicopter target={carRef} />
        <FloorPlane />

        <FollowCamera target={carRef} />
        <MaterialUpdate />
      </WebGLCanvas>
    </div>
  );
};

export default App;
