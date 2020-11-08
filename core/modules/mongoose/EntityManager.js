const capitalize = require("lodash.capitalize");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const BaseEntityManager = require("../common/BaseEntity");
const { linter } = require("../common/linter");

class MongooseManager extends BaseEntityManager {
  static init(name) {
    return linter(this.template(name));
  }

  static template(name) {
    name = capitalize(name);
    return [
      "import {Schema, Types, model } from 'mongoose'",
      "",
      `const ${name} = new Schema({`,
      "updatedAt: { type: Date, default: Date.now }",
      "createdAt: { type: Date, default: Date.now }",
      "})",
      `export const ${name}Model = model('${name}', ${name})`,
    ];
  }

  static templateJs(name) {

  }

  static create(name) {
    const file = path.join(
      this.createOrInitSrc(name),
      `${capitalize(name)}.entity.${super.fileExtension}`
    );
    try {
      fs.writeFileSync(file, this.init(name));
    } catch (error) {
      if (error.errno === -2) {
        throw chalk.red("folder not found");
      }
    }
  }

  static append(nameOrContent, newContent) {
    super.append(nameOrContent, newContent, "}\\)");
  }
}

module.exports = MongooseManager;
