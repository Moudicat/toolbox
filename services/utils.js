/**
 * format date
 * @description: 格式化时间
 * @example: formatDate(12353453, 'yyyy-MM-dd hh:mm:ss')
 * @return:  2010-01-11 01:01:00
 * */
export function formatDate(date, fmt) {
  function padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

export class SearchParser {
  constructor(search) {
    if (search) {
      this.searchArr = search.substring(1).split('&').map(e => {
        let searchItem = e.split('=');
        return {
          name: searchItem[0],
          value: searchItem[1]
        };
      });
    } else {
      this.searchArr = [];
    }
  }

  get(name) {
    for (let k of this.searchArr) {
      if (k.name === name) {
        return k.value;
      }
    }
    return null;
  }

  getAll() {
    return this.searchArr;
  }
}

export function isWechat() {
  return /MicroMessenger/.test(navigator.userAgent);
}