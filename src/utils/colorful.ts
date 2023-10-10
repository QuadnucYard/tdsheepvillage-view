import { getHashCode } from ".";

export function strHue(a: string) {
  return getHashCode(a);
}

export function strHSl(a: string, s: number, l: number) {
  return `hsl(${strHue(a)}, ${s}%, ${l}%)`;
}
