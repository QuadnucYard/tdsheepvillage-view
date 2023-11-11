export class Position {
  static toPercentage(_num: number) {
    return String(Math.round(_num * 100 * 100) / 100) + "%";
  }

  static toGridStr(_subGrid: number) {
    return String(Math.round(_subGrid / 100) / 10);
  }

  static getPosID(_x: string, _y: string) {
    return _x + "_" + _y;
  }

  /* static getIDPos(_id) {
    let _index = _id.indexOf("_");
    let _pos = new Point();
    _pos.x = parseInt(_id.slice(0, _index));
    _pos.y = parseInt(_id.slice(_index + 1, _id.length));
    return _pos;
  } */
}
