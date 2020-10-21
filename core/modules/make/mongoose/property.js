class Maker {
  static common(name, type) {
    return [`${name}: ${type},`];
  }
  static string(name) {
    return this.common(name, "String");
  }

  static boolean(name) {
    return this.common(name, "Boolean");
  }

  static number(name) {
    return this.common(name, "Number");
  }

  static date(name) {
    return this.common(name, "Date");
  }
}
module.exports = Maker;
