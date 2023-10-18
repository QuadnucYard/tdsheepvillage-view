import { getHashCode } from ".";
import Color from "color";

export function strHue(a: string) {
  return getHashCode(a);
}

export function strHSl(a: string, s: number, l: number) {
  return Color.hsl(strHue(a), s, l).string();
}
