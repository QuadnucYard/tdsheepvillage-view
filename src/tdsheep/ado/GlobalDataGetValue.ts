import { GlobalData } from "./GlobalData";

export class GlobalDataGetValue {
  static INTER_CONFIG_SPLIT_CHAR = "^";

  static getLanguageStr(_id, ...args) {
    let _find = null;
    let _subStr = null;
    let _str: string | null = null;
    if (GlobalData.$_global_language_str != null) {
      if (GlobalData.$_global_language_str.getElementsByTagName("id" + _id)[0] != undefined) {
        if (GlobalData.$_global_language_str.getElementsByTagName("id" + _id)[0].getAttribute("str") == "CHILD2010") {
          _str = GlobalData.$_global_language_str
            .getElementsByTagName("id" + _id)[0]
            .children()
            .toString(); //TOFIX
        } else {
          _str = GlobalData.$_global_language_str.getElementsByTagName("id" + _id)[0].getAttribute("str");
        }
      } else {
        _str = null;
      }
    }
    if (!_str?.length) {
      return "";
    }
    let _index = _str.search("%%");
    while (_index != -1) {
      _subStr = _str.slice(_index, _index + 6);
      _str = _str.replace(_subStr, GlobalDataGetValue.getLanguageStr(parseInt(_subStr.slice(2))));
      _index = _str.search("%%");
    }
    for (let i = 0; i < args.length; i++) {
      _find = "%" + i;
      _str = _str?.replaceAll(_find, args[i]);
    }
    return _str;
  }

  static getDataProfileTxt(_id: string | null): string {
    let _oldStr = null;
    let _isIndexOf = false;
    let _arr = null;
    let _xmlId = null;
    let _cnStr = null;
    let _str = _id;
    if (_id) {
      _oldStr = String(_id);
      _isIndexOf = _oldStr.indexOf(GlobalDataGetValue.INTER_CONFIG_SPLIT_CHAR) > -1;
      _arr = null;
      _xmlId = "";
      _cnStr = "";
      if (_isIndexOf) {
        _arr = _oldStr.split(GlobalDataGetValue.INTER_CONFIG_SPLIT_CHAR);
        _xmlId = _arr[0];
        _cnStr = _arr[1];
        if (GlobalData.$_global_dataProfile_txt != null) {
          if (GlobalData.$_global_dataProfile_txt.getElementsByTagName(_xmlId)[0] != undefined) {
            _str = GlobalData.$_global_dataProfile_txt.getElementsByTagName(_xmlId)[0].getAttribute("s").toString();
          } else {
            _str = _cnStr;
          }
          _str = _str.replace(/\\n/g, "\n");
        } else {
          _str = _cnStr;
        }
      } else {
        _str = _oldStr;
      }
      _arr = null;
      _oldStr = "";
      _xmlId = "";
      _cnStr = "";
    }
    return _str;
  }
}
