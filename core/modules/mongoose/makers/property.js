module.exports = class Maker {
  static common(name, type, required) {
    const handlerType = ["mongoose.Types.ObjectId", "Buffer", "Date"];

    const modelType = handlerType.includes(type) ? type : type.toLowerCase();
    return {
      entity: `${name}: {
        type: ${type},
        require: ${required}
      },`,
      model: `${name}: ${modelType}`,
    };
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
