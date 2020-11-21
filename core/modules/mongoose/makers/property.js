module.exports = class Maker {
  static common(name, type, required) {
    return [
      `${name}: {
      type: ${type},
      require: ${required}
    },`,
    ];
  }
  static string(name, required) {
    return this.common(name, "String", required);
  }

  static boolean(name, required) {
    return this.common(name, "Boolean", required);
  }

  static number(name, required) {
    return this.common(name, "Number", required);
  }

  static date(name, required) {
    return this.common(name, "Date", required);
  }

  static objectid(name, required) {
    return this.common(name, "mongoose.Types.ObjectId", required);
  }

  static buffer(name, required) {
    return this.common(name, "Buffer", required);
  }
};
