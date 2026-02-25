const FloorPlane = () => {
  return (
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial opacity={0} transparent />
    </mesh>
  );
};

export default FloorPlane;
