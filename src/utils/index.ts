export function getHashCode(str: string, caseSensitive = false) {
  if (!caseSensitive) {
    str = str.toLowerCase();
  }
  let hash = 1315423911;
  for (let i = str.length - 1; i >= 0; i--) {
    hash ^= (hash << 5) + str.charCodeAt(i) + (hash >> 2);
  }
  return hash & 0x7fffffff;
}

export const isAlpha = function (val: string) {
  return /^[a-zA-Z]+$/.test(val);
};

export const compareNumber = function (a: number, b: number) {
  return a < b ? -1 : a > b ? 1 : 0;
};

export function range(end: number): number[];
export function range(start: number, end: number): number[];
export function range(start: number, end: number = 0) {
  if (end == 0) {
    end = start;
    start = 0;
  }
  return new Array<number>(end - start).fill(0).map((el, i) => start + i);
}

export const toString = (obj: any) => obj.toString();

export function* enumerate<T>(a: Iterable<T>) {
  let i = 0;
  for (const x of a) {
    yield [i++, x];
  }
}

export function* accumulate(a: Iterable<number>) {
  let s = 0;
  for (const x of a) {
    s += x;
    yield s;
  }
}

export function getStep(x: number) {
  if (x === 0) return 1;
  x = Math.abs(x);
  if (x % 1 === 0) return Math.pow(10, Math.floor(Math.log10(x)));
  const s = x.toString();
  return Math.pow(10, s.indexOf(".") - s.length + 1);
}

export function zeros(dim0: number): number[];
export function zeros(dim0: number, dim1: number): number[][];

export function zeros(...dims: number[]) {
  if (dims.length == 1) {
    return new Array<number>(dims[0]).fill(0);
  }
  if (dims.length == 2) {
    return Array.from({ length: dims[0] }, () => new Array<number>(dims[1]).fill(0));
  }
}
