import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useProgress } from "@react-three/drei";

export default function ControlsHintOverlay() {
  const { progress } = useProgress();
  const divRef = useRef<HTMLDivElement>(null);
  const [canShow, setCanShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Wait a bit after loading completes to show the hint
      const timer = setTimeout(() => {
        setCanShow(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    if (!divRef.current) return;

    if (canShow) {
      gsap.to(divRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.5,
      });

      // Auto-hide after 8 seconds
      const hideTimer = setTimeout(() => {
        gsap.to(divRef.current, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.5,
        });
      }, 8000);

      return () => clearTimeout(hideTimer);
    }
  }, [canShow]);

  return (
    <div
      ref={divRef}
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-55 opacity-0 pointer-events-none"
    >
      <div className="bg-black backdrop-blur-sm rounded-lg p-8 max-w-md mx-4 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Controls
        </h2>

        {/* Desktop Controls */}
        {!isMobile && (
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <p className="text-white font-semibold">Move</p>
              <p className="text-gray-400 text-sm">
                Press <b>W</b> or <b>S</b> on keyboard
              </p>
            </div>

            <div className="flex items-start gap-3">
              <p className="text-white font-semibold">Honk</p>
              <p className="text-gray-400 text-sm">
                Press <b>G</b> on keyboard
              </p>
            </div>
          </div>
        )}

        {/* Mobile Controls */}
        {isMobile && (
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl min-w-fit">👈</div>
              <div>
                <p className="text-white font-semibold">Backward</p>
                <p className="text-gray-400 text-sm">
                  Touch left half of screen
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-2xl min-w-fit">👉</div>
              <div>
                <p className="text-white font-semibold">Forward</p>
                <p className="text-gray-400 text-sm">
                  Touch right half of screen
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center text-gray-500 text-xs pt-4 border-t border-gray-700">
          This message will disappear automatically
        </div>
      </div>
    </div>
  );
}
