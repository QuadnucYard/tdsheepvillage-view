import Color from "color";

import { getHashCode } from ".";

export function strHue(a: string) {
  return getHashCode(a);
}

export function strHSl(a: string, s: number, l: number) {
  return Color.hsl(strHue(a), s, l).string();
}

export function colorFromUint(c: int) {
  return "#" + c.toString(16).padStart(6, "0");
}
