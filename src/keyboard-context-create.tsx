import { createContext } from "react";
import type { RefObject } from "react";

export interface KeyboardState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  handbrake: boolean;
  horn: boolean;
}

export const KeyboardContext = createContext<RefObject<KeyboardState> | null>(
  null,
);
