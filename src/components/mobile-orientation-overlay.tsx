import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function MobileOrientationOverlay() {
  const [isPortrait, setIsPortrait] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOrientation = () => {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      const isPortraitMode = window.innerHeight > window.innerWidth;
      setIsPortrait(isMobile && isPortraitMode);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  useEffect(() => {
    if (!divRef.current) return;

    if (isPortrait) {
      gsap.to(divRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
      });
    } else {
      gsap.to(divRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      });
    }
  }, [isPortrait]);

  return (
    <div
      ref={divRef}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-60 opacity-0 pointer-events-none transition-opacity duration-300"
    >
      <div className="text-center px-6">
        <h1 className="text-4xl font-bold text-white mb-4">
          Rotate Your Phone
        </h1>
        <p className="text-xl text-gray-300">
          Please rotate your phone to landscape mode for the best experience
        </p>

        <div className="mt-8 text-5xl animate-bounce">↻</div>
      </div>
    </div>
  );
}
