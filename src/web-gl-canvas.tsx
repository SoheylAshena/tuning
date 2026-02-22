import { Canvas } from "@react-three/fiber";
import { Color } from "three";

const WebGLCanvas = ({
  ref,
  children,
}: {
  ref: React.RefObject<HTMLCanvasElement | null>;
  children: React.ReactNode;
}) => {
  return (
    <Canvas
      ref={ref}
      camera={{ fov: 45, position: [-3, 3, 5] }}
      scene={{ background: new Color(0x888888) }}
    >
      {children}
    </Canvas>
  );
};

export default WebGLCanvas;
