module.exports = class Maker {
  static common(type, name, mandatory = true) {
    return [`@Column`, `${name}: ${type}`];
  }
  static string(name, required) {
    return this.common("String", name, required);
  }

  static boolean(name, required) {
    return this.common("Boolean", name, required);
  }

  static number(name, required) {
    return this.common("Number", name, required);
  }

  static enum(name, required) {}

  static date(name) {
    return this.common("Date", name);
  }
};
