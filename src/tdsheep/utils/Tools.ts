import { GlobalData } from "../ado/GlobalData";
import { GlobalDataGetValue } from "../ado/GlobalDataGetValue";

type uint = int;

export class Tools {
  static DEFAULT = "default";

  public static formatTime(_timeNum: number, isChinese: boolean = false): string {
    let _timerS: int = _timeNum % 60;
    let _timerM: int = Math.floor(_timeNum / 60) % 60;
    let _timerH: int = Math.floor(_timeNum / 3600);
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
        _str +=
          Math.floor(_timerS) > 9
            ? Math.floor(_timerS).toString()
            : "0" + Math.floor(_timerS).toString();
      }
    }
    return _str;
  }

  public static formatTime_day(_timeNum: number): string {
    let _timerHs: int = Math.floor(_timeNum / 3600);
    let _day: int = Math.floor(_timerHs / 24);
    let _timerM: int = Math.ceil(_timeNum / 60) % 60;
    let _timerH: int = _timerHs % 24;
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
    let _timerM: int = Math.floor(_timeNum / 60) % 60;
    let _timerH: int = Math.floor(_timeNum / 3600);
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
    let k: any = undefined;
    let _num: int = 0;
    for (k in _obj) {
      _num++;
    }
    return _num;
  }

  public static randomElement(_obj: any): any {
    let k: any = undefined;
    let _num: int = 0;
    let _max: int = Tools.getElementNum(_obj);
    let _random: int = Math.floor(Math.random() * _max);
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
      _str = !!_char_w
        ? GlobalDataGetValue.getLanguageStr(116)
        : GlobalDataGetValue.getLanguageStr(108);
      return Math.round(_num / 10000) + _str;
    }
    return String(_num);
  }

  public static fillSpace(_srcStr: string, _lineMax: int = 10, _isFront: boolean = true): string {
    let _codeNum: int = 0;
    let i: int = 0;
    let _code: uint = 0;
    let _allCodeNum: int = 0;
    let _str: string = "";
    for (i = 0; i < _srcStr.length; i++) {
      _code = _srcStr.charCodeAt(i);
      if (_code >= 32 && _code <= 126) {
        _codeNum = 1;
      } else {
        _codeNum = 2;
      }
      _allCodeNum += _codeNum;
    }
    for (i = _allCodeNum; i < _lineMax; i++) {
      _str += " ";
    }
    if (_isFront) {
      _str += _srcStr;
    } else {
      _str = _srcStr + _str;
    }
    return _str;
  }

  public static formatHtmlText(
    _str: string,
    _color: uint = 3355443,
    _b: boolean = false,
    _size: int = 14,
    _font: string = "",
    _lineMax: int = 12,
    _exception: Array = null
  ): string {
    let _msg_group: string = "";
    let _char: string = "";
    let _lastStr: string = "";
    let _colorStr: string = "#" + _color.toString(16);
    if (_lineMax < 1000) {
      _msg_group = _str;
      _lastStr = Tools.formatLine(_msg_group, "\n", _lineMax * 2, _exception);
    } else {
      _lastStr = _str;
    }
    if (_b) {
      return (
        '<font color="' +
        _colorStr +
        '" size="' +
        _size +
        '" face="' +
        _font +
        '"><b>' +
        _lastStr +
        "</b></font>"
      );
    }
    return (
      '<font color="' +
      _colorStr +
      '" size="' +
      _size +
      '" face="' +
      _font +
      '">' +
      _lastStr +
      "</font>"
    );
  }

  public static getLine(
    _length: int = 40,
    _code: string = "=",
    _align: string = "",
    _size: int = 5
  ): string {
    let i: int = 0;
    let _str: string = "";
    if (_code == "") {
      _code = "=";
    }
    if (_align == "") {
      _align = "left";
    }
    for (i = 0; i < _length; i++) {
      _str += _code;
    }
    return HtmlTextFormat.format(_str, _align, 6316128, _size);
  }

  public static formatHtmlTextBr(_arr: Array, _align: string = "left"): string {
    let _msg: string = "";
    for (let i: int = 0; i < _arr.length; i++) {
      _msg += '<P ALIGN="' + _align + '">' + _arr[i] + "</P>";
    }
    return _msg;
  }

  public static formatLine(
    _srcStr: string,
    _insertStr: string = "\n",
    _lineMax: int = 16,
    _exception: Array = null
  ): string {
    let _checkNum: int = 0;
    let _codeNum: int = 0;
    let _code: uint = 0;
    let _char: string = null;
    let _str: string = "";
    let _tempStr: string = "";
    let _lineNum: int = 0;
    if (_exception == null) {
      _exception = [];
    }
    if (_lineMax <= 1) {
      _lineMax = 2;
    }
    for (_checkNum = 0; _checkNum < _srcStr.length; _checkNum++) {
      _code = _srcStr.charCodeAt(_checkNum);
      _char = _srcStr.charAt(_checkNum);
      if (_char == "\n") {
        _lineNum = 0;
        _str += _char;
      } else {
        if (_exception.indexOf(_char) != -1) {
          _codeNum = 0;
        } else if (_code >= 32 && _code <= 126) {
          _codeNum = 1;
        } else {
          _codeNum = 2;
        }
        _lineNum += _codeNum;
        if (_lineNum > _lineMax) {
          _str += _insertStr;
          _lineNum = _codeNum;
        }
        _str += _char;
      }
    }
    return _str;
  }

  public static clearLine(_srcStr: string): string {
    _srcStr = _srcStr.replace("\n", "");
    _srcStr = _srcStr.replace("<br>", "");
    return _srcStr.replace("</br>", "");
  }

  public static isHtml(_str: string): boolean {
    let i: int = _str.indexOf("<");
    let j: int = _str.indexOf(">");
    if (i != -1 && j != -1 && i < j) {
      return true;
    }
    return false;
  }

  public static insertStr(
    _srcStr: string,
    _insertStr: string = "\n",
    _spaceNum: int = 4,
    _loopMax: int = 1
  ): string {
    let _str: string = "";
    let _tempStr: string = "";
    let _checkNum: int = 0;
    let _loopNum: int = 0;
    if (_loopMax <= 0) {
      _loopMax = int.MAX_VALUE;
    }
    if (_spaceNum <= 0) {
      _spaceNum = 1;
    }
    while (_loopNum < _loopMax) {
      _tempStr = _srcStr.substr(_loopNum * _spaceNum, _spaceNum);
      _loopNum++;
      if (_tempStr.length != _spaceNum) {
        _str += _tempStr;
      }
      _tempStr += _insertStr;
      _str += _tempStr;
    }
    return _str + _srcStr.substr(_loopNum * _spaceNum);
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
    let reg: RegExp = new RegExp(_findStr, "g");
    return _srcStr.replace(reg, _placeStr);
  }

  public static getDateSecond(_date: Date): number {
    return Math.floor(_date.getTime() * 0.001);
  }

  public static isNoChildrenInArr(_arr: Array): boolean {
    let _b: boolean = false;
    if (_arr != null) {
      if (_arr.length > 0) {
        _b = false;
      } else {
        _b = true;
      }
    } else {
      _b = true;
    }
    return _b;
  }

  public static isNoChildrenInObj(_obj: any): boolean {
    let _num: int = 0;
    let i: any = null;
    let _b: boolean = true;
    if (_obj) {
      _num = 0;
      for (i in _obj) {
        _num++;
      }
      if (_num > 0) {
        _b = false;
      }
    }
    return _b;
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
    let type: any = typeof obj;
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
    return new Date(
      _nowDate.getUTCFullYear(),
      _nowDate.getUTCMonth(),
      _nowDate.getUTCDate(),
      23,
      59,
      59
    );
  }

  public static replaceAllBySplit(
    _strSource: string,
    _strReplaceFrom: string,
    _strRepalceTo: string
  ): string {
    return _strSource == null ? null : _strSource.split(_strReplaceFrom).join(_strRepalceTo);
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
