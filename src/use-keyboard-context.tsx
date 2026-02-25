import { useContext } from "react";
import { KeyboardContext } from "./keyboard-context-create";

export function useKeyboardContext() {
  const context = useContext(KeyboardContext);
  if (!context) {
    throw new Error(
      "useKeyboardContext must be used within a KeyboardProvider",
    );
  }
  return context;
}
