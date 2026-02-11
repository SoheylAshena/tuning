import type { Object3D, Vector3 } from "three";

export interface MyObject3D extends Object3D {
  speed: number;
  carBody: Object3D | null;
  wheels: Object3D[];
  physicsPosition: Vector3;
}
