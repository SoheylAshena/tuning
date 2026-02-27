import { useFBX } from "@react-three/drei";
import gsap from "gsap";
import { useEffect } from "react";

const About = () => {
  const model = useFBX("/models/about.fbx");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;
    model.traverse((child) => {
      if (child.name.includes("Pole")) {
        ctx = gsap.context(() => {
          gsap.to(child.rotation, {
            y: 6.28,
            duration: 5,
            repeat: -1,
            ease: "none",
          });
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, [model]);

  return <primitive object={model} />;
};

export default About;
