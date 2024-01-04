export {}; // this file needs to be a module
declare global {
  interface Array<T> {
    firstOrDefault(predicate: (item: T) => boolean): T;
    removeAt(index: number): T;
    removeOne(item: T | null): boolean;
    addRange(items: T[]): void;
    removeRange(items: T[]): void;
    contains(item: T | null): boolean;
    empty(): boolean;
  }
  interface String {
    isNullOrEmpty(this: string): boolean;
  }
}
