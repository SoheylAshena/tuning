/* eslint-disable react-hooks/immutability */
import { useKeyboardContext } from "../hooks/use-keyboard-context";

export const HornButton = () => {
  const keys = useKeyboardContext();
  return (
    <button
      onTouchStart={(e) => {
        e.stopPropagation();
        keys.current.horn = true;
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        keys.current.horn = false;
      }}
      onTouchCancel={(e) => {
        e.stopPropagation();
        keys.current.horn = false;
      }}
      onMouseDown={() => (keys.current.horn = true)}
      onMouseUp={() => (keys.current.horn = false)}
      className="
        fixed
        bottom-6
        left-6
       
       
        text-white
        text-2xl
        flex
        items-center
        justify-center
       
        select-none
        touch-none
        z-50
      "
    >
      🔊
    </button>
  );
};
