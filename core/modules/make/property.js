class Maker {
  static common(typeDb, name, mandatory = true, typeJs = null) {
    return [
      `\t@Column({type: "${typeDb}"${mandatory ? "" : ", nullable: true"}})`,
      `\t${name}: ${typeJs ?? typeDb}\n`,
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
    return this.common("date", name, required, "Date");
  }
}
module.exports = Maker;
