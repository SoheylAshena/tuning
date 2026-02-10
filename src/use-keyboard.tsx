import { useEffect, useRef } from "react";

export const useKeyboard = () => {
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    handbrake: false,
  });

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          keys.current.forward = true;
          break;
        case "KeyS":
        case "ArrowDown":
          keys.current.backward = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          keys.current.left = true;
          break;
        case "KeyD":
        case "ArrowRight":
          keys.current.right = true;
          break;
        case "Space":
          keys.current.handbrake = true;
          break;
      }
    };

    const onUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          keys.current.forward = false;
          break;
        case "KeyS":
        case "ArrowDown":
          keys.current.backward = false;
          break;
        case "KeyA":
        case "ArrowLeft":
          keys.current.left = false;
          break;
        case "KeyD":
        case "ArrowRight":
          keys.current.right = false;
          break;
        case "Space":
          keys.current.handbrake = false;
          break;
      }
    };

    // ---------- TOUCH ----------
    const updateTouch = (touches: TouchList) => {
      // reset
      keys.current.forward = false;
      keys.current.backward = false;
      keys.current.left = false;
      keys.current.right = false;
      keys.current.handbrake = false;

      if (touches.length >= 2) {
        keys.current.handbrake = true;
      }

      const w = window.innerWidth;

      for (let i = 0; i < touches.length; i++) {
        const t = touches[i];

        if (t.clientX > w / 2) keys.current.forward = true;
        else keys.current.backward = true;
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

  return keys;
};
