const capitalize = require("lodash.capitalize");
const BaseEntityManager = require("../common/BaseEntity");
const { linter } = require("../common/linter");

class TypeOrmManager extends BaseEntityManager {
  static init(name) {
    return linter(this.template(name));
  }

  static template(name) {
    return [
      'import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm"',
      "",
      "@Entity()",
      `export class ${capitalize(name)} extends BaseEntity {`,
      "@PrimaryGeneratedColumn()",
      "id: number",
      "",
      "@CreateDateColumn()",
      "createDate: Date",
      "",
      "@UpdateDateColumn()",
      "updateDate: Date",
      "",
      "}",
    ];
  }

  static append(nameOrContent, newContent) {
    return super.append(nameOrContent, newContent, "}");
  }
}

module.exports = TypeOrmManager;
