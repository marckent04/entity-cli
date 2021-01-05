module.exports = class Maker {
  static typeHandler(type) {
    switch (type) {
      case "mongoose.Types.ObjectId":
        return "string";
        break;
      case "Buffer":
        return "Buffer";
        break;
      case "Date":
        return "Date";
        break;
      default:
        return type.toLowerCase();
    }
  }
  static common(name, type, required) {
    const modelType = this.typeHandler(type);
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
