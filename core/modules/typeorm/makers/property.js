module.exports = class Maker {
  static common(typeDb, name, mandatory = true, typeJs = null) {
    return [
      `@Column({type: "${typeDb}"${mandatory ? "" : ", nullable: true"}})`,
      `${name}: ${typeJs || typeDb}\n`,
    ];
  }
  static string(name, required) {
    return this.common("varchar", name, required, "string");
  }

  static boolean(name, required) {
    return this.common("boolean", name, required);
  }

  static text(name, required) {
    return this.common("text", name, required, "string");
  }

  static number(name, required) {
    return this.common("int", name, required, "number");
  }

  static enum(name, required) {}

  static date(name) {
    return this.common("date", name, "Date");
  }
};
