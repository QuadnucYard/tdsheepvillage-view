import { GlobalDataGetValue } from "../ado/GlobalDataGetValue";

type uint = int;

interface Point {
  x: number;
  y: number;
}

export class Tools {
  static DEFAULT = "default";

  public static formatTime(_timeNum: number, isChinese: boolean = false): string {
    const _timerS: int = _timeNum % 60;
    const _timerM: int = Math.floor(_timeNum / 60) % 60;
    const _timerH: int = Math.floor(_timeNum / 3600);
    let _str: string = "";
    if (isChinese) {
      if (_timerH > 0) {
        _str = _timerH.toString() + GlobalDataGetValue.getLanguageStr(21);
        return _str + (_timerM.toString() + GlobalDataGetValue.getLanguageStr(22));
      }
      if (_timerM > 0) {
        _str += _timerM.toString() + GlobalDataGetValue.getLanguageStr(22);
        return _str + (_timerS.toString() + GlobalDataGetValue.getLanguageStr(23));
      }
      if (_timerS >= 0) {
        _str += _timerS.toString() + GlobalDataGetValue.getLanguageStr(23);
      }
    } else {
      if (_timerH >= 0) {
        _str = (_timerH > 9 ? _timerH.toString() : "0" + _timerH.toString()) + ":";
      }
      if (_timerM >= 0) {
        _str += (_timerM > 9 ? _timerM.toString() : "0" + _timerM.toString()) + ":";
      }
      if (_timerS >= 0) {
        _str += Math.floor(_timerS) > 9 ? Math.floor(_timerS).toString() : "0" + Math.floor(_timerS).toString();
      }
    }
    return _str;
  }

  public static formatTime_day(_timeNum: number): string {
    const _timerHs: int = Math.floor(_timeNum / 3600);
    const _day: int = Math.floor(_timerHs / 24);
    const _timerM: int = Math.ceil(_timeNum / 60) % 60;
    const _timerH: int = _timerHs % 24;
    let _str: string = "";
    if (_day > 0) {
      _str = _day.toString() + GlobalDataGetValue.getLanguageStr(20);
    }
    if (_timerH > 0) {
      _str += _timerH.toString() + GlobalDataGetValue.getLanguageStr(21);
    }
    if (_timerM > 0) {
      _str += _timerM.toString() + GlobalDataGetValue.getLanguageStr(22);
    }
    return _str;
  }

  public static formatTime_M(_timeNum: number, isChinese: boolean = false): string {
    const _timerM: int = Math.floor(_timeNum / 60) % 60;
    const _timerH: int = Math.floor(_timeNum / 3600);
    let _str: string = "";
    if (isChinese) {
      if (_timerH > 0) {
        _str = _timerH.toString() + GlobalDataGetValue.getLanguageStr(21);
        return _str + (_timerM.toString() + GlobalDataGetValue.getLanguageStr(22));
      }
      if (_timerM > 0) {
        return _str + (_timerM.toString() + GlobalDataGetValue.getLanguageStr(22));
      }
      return GlobalDataGetValue.getLanguageStr(24);
    }
    if (_timerH >= 0) {
      _str = _timerH.toString() + ":";
    }
    if (_timerM >= 0) {
      _str += _timerM.toString() + ":";
    }
    return _str;
  }

  public static getElementNum(_obj: any): int {
    return Object.keys(_obj).length;
  }

  public static randomElement(_obj: any): any {
    let k: any = undefined;
    let _num: int = 0;
    const _max: int = Tools.getElementNum(_obj);
    const _random: int = Math.floor(Math.random() * _max);
    for (k of _obj) {
      if (_num == _random) {
        return k;
      }
      _num++;
    }
    return null;
  }

  public static formatHtmlText_normal(
    _str: string,
    _lineMax: int = 10,
    _color: uint = 3355443,
    _font: string = ""
  ): string {
    return Tools.formatHtmlText(_str, _color, false, 14, _font, _lineMax);
  }

  public static getSimpleNumStr(_num: int, _char_w: boolean = false): string {
    let _str: string;
    if (_num > 10000) {
      _str = _char_w ? GlobalDataGetValue.getLanguageStr(116) : GlobalDataGetValue.getLanguageStr(108);
      return Math.round(_num / 10000) + _str;
    }
    return String(_num);
  }

  public static getValueByIndex(_index: int, _srcData: { [key: string]: any }) {
    for (const k in _srcData) {
      if (k != Tools.DEFAULT) {
        const _minMax = Tools.getIDPos(k);
        if (_index >= _minMax.x && _index <= _minMax.y) {
          return _srcData[k];
        }
      }
    }
    return _srcData[Tools.DEFAULT] ?? 1;
  }

  public static getIDPos(_id: string): Point {
    const _index: int = _id.indexOf("_");
    return { x: parseInt(_id.slice(0, _index)), y: parseInt(_id.slice(_index + 1, _id.length)) };
  }

  public static getGlobalAttValue_byID(_globalAttName: any, _id: int = 0): any {
    return _globalAttName["id_" + _id];
  }

  public static setObjAttributeValue(_data: any, _dataArr: Array, _attName: string): any {
    for (let i: int = 0; i < _dataArr.length; i++) {
      _data[_dataArr[i][_attName]] = _dataArr[i];
    }
    return _data;
  }

  public static getObjAttributeValue(_data: any, _attName: string): any {
    return _data[_attName] == null && _data[_attName] == undefined ? null : _data[_attName];
  }

  public static isNullAndUndefined(_obj: any): boolean {
    return _obj == null || _obj == undefined ? Boolean(true) : Boolean(false);
  }

  public static isNullForArray(_arr: Array): boolean {
    if (_arr != null) {
      if (_arr.length > 0) {
        return false;
      }
    }
    return true;
  }

  public static addObjectNewAtt(_obj: any, _newObj: any): any {
    let i: any = null;
    if (!Tools.isNullAndUndefined(_newObj)) {
      for (i in _newObj) {
        _obj[i] = _newObj[i];
      }
    }
    return _obj;
  }

  public static isSameDate(_a: Date, _b: Date): boolean {
    if (!_a || !_b) {
      return false;
    }
    if (
      _a.getUTCFullYear() == _b.getUTCFullYear() &&
      _a.getUTCMonth() == _b.getUTCMonth() &&
      _a.getUTCDate() == _b.getUTCDate()
    ) {
      return true;
    }
    return false;
  }

  public static getRandom(_min: int, _max: int): int {
    let _temp: int = 0;
    if (_min == _max) {
      return _min;
    }
    if (_min > _max) {
      _temp = _min;
      _min = _max;
      _max = _temp;
    }
    _temp = _max - _min + 1;
    return Math.floor(_min + Math.random() * _temp);
  }

  public static replaceString(_srcStr: string, _findStr: string, _placeStr: string): string {
    const reg: RegExp = new RegExp(_findStr, "g");
    return _srcStr.replace(reg, _placeStr);
  }

  public static getDateSecond(_date: Date): number {
    return Math.floor(_date.getTime() * 0.001);
  }

  public static toString(obj: any, _step: int = 0, _isTranslate: boolean = false): string {
    let i: int = 0;
    let j: int = 0;
    let k: any = null;
    let _regExp: RegExp = null;
    let resultStr: string = "";
    _step++;
    if (obj == null) {
      return "null";
    }
    const type: any = typeof obj;
    let num: int = 0;
    switch (type) {
      case "number":
        return obj.toString() + "";
      case "string":
        return '"' + obj + '"';
      case "object":
        if (obj instanceof Array) {
          num = Tools.getElementNum(obj);
          if (num > 1) {
            if (_step > 1) {
              resultStr += "\n";
            }
            for (j = 0; j < _step - 1; j++) {
              resultStr += "\t";
            }
          }
          resultStr += "[";
          for (i = 0; i < obj.length; i++) {
            if (num > 1) {
              resultStr += "\n";
              for (j = 0; j < _step; j++) {
                resultStr += "\t";
              }
            }
            resultStr += toString(obj[i], _step);
            resultStr += ",";
          }
          if (num > 0) {
            resultStr = resultStr.slice(0, resultStr.length - 1);
          }
          if (num > 1) {
            resultStr += "\n";
            for (j = 0; j < _step - 1; j++) {
              resultStr += "\t";
            }
          }
          resultStr += "]";
        } else if (obj instanceof Date) {
          resultStr = "new Date(" + (obj as Date).getTime() + ")";
        } else {
          num = Tools.getElementNum(obj);
          if (num > 1) {
            if (_step > 1) {
              resultStr += "\n";
            }
            for (j = 0; j < _step - 1; j++) {
              resultStr += "\t";
            }
          }
          resultStr += "{";
          for (k in obj) {
            if (num > 1) {
              resultStr += "\n";
              for (j = 0; j < _step; j++) {
                resultStr += "\t";
              }
            }
            _regExp = /\D/gi;
            if (!isNaN(Number(k.slice(0, 1))) || k.search(/[^a-zA-Z0-9_]/) != -1) {
              resultStr += '"' + k + '":' + Tools.toString(obj[k], _step);
            } else {
              resultStr += k + ":" + Tools.toString(obj[k], _step);
            }
            resultStr += ",";
          }
          if (num > 0) {
            resultStr = resultStr.slice(0, resultStr.length - 1);
          }
          if (num > 1) {
            resultStr += "\n";
            for (j = 0; j < _step - 1; j++) {
              resultStr += "\t";
            }
          }
          resultStr += "}";
        }
        break;
      case "boolean":
        return obj.toString() + "";
    }
    return resultStr;
  }

  public static getTodayEndUTCTime(_nowDate: Date): Date {
    return new Date(_nowDate.getUTCFullYear(), _nowDate.getUTCMonth(), _nowDate.getUTCDate(), 23, 59, 59);
  }

  public static replaceAllBySplit(_strSource: string, _strReplaceFrom: string, _strRepalceTo: string): string {
    return _strSource.split(_strReplaceFrom).join(_strRepalceTo);
  }

  public static formatNumberToString(_num: int): string {
    let _str: string;
    if (_num >= 1000 && _num <= 9999) {
      _num = Math.floor(_num * 0.001);
      _str = _num.toString() + "千";
    } else if (_num >= 10000) {
      _num = Math.floor(_num * 0.0001);
      _str = _num.toString() + "万";
    } else {
      _str = _num.toString();
    }
    return _str;
  }
}
