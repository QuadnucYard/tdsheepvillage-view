export {}; // this file needs to be a module

(function () {
  if (!String.prototype.isNullOrEmpty) {
    String.prototype.isNullOrEmpty = function (this: string): boolean {
      return !this;
    };
  }

  if (!Array.prototype.firstOrDefault) {
    Array.prototype.firstOrDefault = function (predicate: (item: any) => boolean) {
      for (let i = 0; i < this.length; i++) {
        const item = this[i];
        if (predicate(item)) {
          return item;
        }
      }
      return null;
    };
  }

  if (!Array.prototype.removeAt) {
    Array.prototype.removeAt = function (index: number): any {
      const item = this[index];
      this.splice(index, 1);
      return item;
    };
  }

  if (!Array.prototype.removeOne) {
    Array.prototype.removeOne = function (item: any | null): boolean {
      const index = this.indexOf(item);
      if (index >= 0) {
        this.splice(index, 1);
        return true;
      }
      return false;
    };
  }

  if (!Array.prototype.removeRange) {
    Array.prototype.removeRange = function (items: any[]): void {
      for (let i = 0; i < items.length; i++) {
        this.removeOne(items[i]);
      }
    };
  }

  if (!Array.prototype.addRange) {
    Array.prototype.addRange = function (items: any[]): void {
      for (let i = 0; i < items.length; i++) {
        this.push(items[i]);
      }
    };
  }

  if (!Array.prototype.contains) {
    Array.prototype.contains = function (item: any | null): boolean {
      return this.indexOf(item) != -1;
    };
  }

  if (!Array.prototype.empty) {
    Array.prototype.empty = function (): boolean {
      return this.length == 0;
    };
  }
})();
