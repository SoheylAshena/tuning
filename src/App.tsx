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

const App = () => {
  const carRef = useRef<MyObject3D>(null!);

  return (
    <div className="w-full h-screen">
      <WebGLCanvas>
        <OrbitControls />
        {/* <Environment
          files={"/hdri/studio-low.exr"}
          environmentIntensity={1.5}
        /> */}
        <ambientLight intensity={3} />
        <PlayerCar ref={carRef} />
        <Hello />
        <About />
        <Helicopter target={carRef} />
        <FloorPlane />

        <FollowCamera target={carRef} />
      </WebGLCanvas>
    </div>
  );
};

export default App;
