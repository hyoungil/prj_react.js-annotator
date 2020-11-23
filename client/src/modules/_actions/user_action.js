import { SIDE_HANDEL_MOUSE, } from "./types";

export function sideMenuHandle(value) {

  return {
    type: SIDE_HANDEL_MOUSE,
    payload: value,
  };
}
