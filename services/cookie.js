export default class Cookie {
  /**
   * set cookie
   * @param name 要设置的cookie名
   * @param value 要设置的cookie值
   * @param day 要设置的cookie过期时间(单位 天) 不写默认为session
   */
  static set(name, value, day) {
    if (day) {
      let exp = new Date();
      exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + value + ';expires=' + exp.toGMTString();
    } else {
      document.cookie = name + '=' + value;
    }
  }

  /**
   * get cookie
   * @param name 要获取的cookie名
   */
  static get(name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    let arr = document.cookie.match(reg);
    if (arr) {
      return arr[2];
    } else {
      return null;
    }
  }
  /**
   * del cookie
   * @param name 要删除的cookie名
   */
  static del(name) {
    this.set(name, '', -1);
  }
}
