import React, { useRef } from "react";
import type { ReactNode } from "react";
import { KeyboardContext } from "./keyboard-context-create";

export function KeyboardProvider({ children }: { children: ReactNode }) {
  const keysRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    handbrake: false,
    horn: false,
  });

  React.useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          keysRef.current.forward = true;
          break;
        case "KeyS":
        case "ArrowDown":
          keysRef.current.backward = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          keysRef.current.left = true;
          break;
        case "KeyD":
        case "ArrowRight":
          keysRef.current.right = true;
          break;
        case "Space":
          keysRef.current.handbrake = true;
          break;
        case "KeyG":
          keysRef.current.horn = true;
          break;
      }
    };

    const onUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          keysRef.current.forward = false;
          break;
        case "KeyS":
        case "ArrowDown":
          keysRef.current.backward = false;
          break;
        case "KeyA":
        case "ArrowLeft":
          keysRef.current.left = false;
          break;
        case "KeyD":
        case "ArrowRight":
          keysRef.current.right = false;
          break;
        case "Space":
          keysRef.current.handbrake = false;
          break;
        case "KeyG":
          keysRef.current.horn = false;
          break;
      }
    };

    // ---------- TOUCH ----------
    const updateTouch = (touches: TouchList) => {
      // reset
      keysRef.current.forward = false;
      keysRef.current.backward = false;
      keysRef.current.left = false;
      keysRef.current.right = false;
      keysRef.current.handbrake = false;

      if (touches.length >= 2) {
        keysRef.current.handbrake = true;
      }

      const w = window.innerWidth;

      for (let i = 0; i < touches.length; i++) {
        const t = touches[i];

        if (t.clientX > w / 2) keysRef.current.forward = true;
        else keysRef.current.backward = true;
      }
    };

    const onTouchStart = (e: TouchEvent) => updateTouch(e.touches);
    const onTouchMove = (e: TouchEvent) => updateTouch(e.touches);
    const onTouchEnd = (e: TouchEvent) => updateTouch(e.touches);

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);

      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <KeyboardContext.Provider value={keysRef}>
      {children}
    </KeyboardContext.Provider>
  );
}
