import { useRef } from "react";
import WebGLCanvas from "./web-gl-canvas";
import PlayerCar from "./player-car";
import type { MyObject3D } from "./types";
import Hello from "./hello";
import Helicopter from "./helicopter";
import FollowCamera from "./follow-camera";
import About from "./about";
import MaterialUpdate from "./material-update";

const App = () => {
  const carRef = useRef<MyObject3D>(null!);

  return (
    <div className="w-full h-screen">
      <WebGLCanvas>
        <PlayerCar ref={carRef} />
        <Hello />
        <About />
        <Helicopter target={carRef} />

        <FollowCamera target={carRef} />
        <MaterialUpdate />
      </WebGLCanvas>
    </div>
  );
};

export default App;
