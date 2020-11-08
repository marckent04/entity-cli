const capitalize = require("lodash.capitalize");
const BaseEntityManager = require("../common/BaseEntity");
const { getFileExtension } = require("../common/configFile");
const { linter } = require("../common/linter");

class SequelizeManager extends BaseEntityManager {
  static init(name) {
    return linter(this[`template${capitalize(getFileExtension())}`](name));
  }

  static templateJs(name) {
    return [];
  }

  static templateTs(name) {
    return [
      'import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from "sequelize-typescript"',
      "",
      "@Table({",
      "  timestamps: true",
      "})",
      `export class ${capitalize(name)} extends Model<${capitalize(name)}> {`,
      "   @CreatedAt",
      "  creationDate: Date;",
      " ",
      "@UpdatedAt",
      "  updatedOn: Date;",
      "}",
    ];
  }

  static append(nameOrContent, newContent) {
    return super.append(nameOrContent, newContent, "}");
  }
}

module.exports = SequelizeManager;
