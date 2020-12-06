const capitalize = require("lodash.capitalize");
const BaseEntityManager = require("../common/BaseEntity");
const { linter } = require("../common/linter");

class MongooseManager extends BaseEntityManager {

  static templateTs(name) {
    name = capitalize(name);
    return [
      "import * as mongoose from 'mongoose'",
      "",
      `export const ${name} = new mongoose.Schema({`,
      "updatedAt: { type: Date, default: Date.now },",
      "createdAt: { type: Date, default: Date.now }",
      "})",
      // `export const ${name}Model = model('${name}', ${name})`,
    ];
  }

  static templateJs(name) {
    name = capitalize(name);
    return [
      "const mongoose = require('mongoose')",
      "",
      `const ${name} = new mongoose.Schema({`,
      "updatedAt: { type: Date, default: Date.now },",
      "createdAt: { type: Date, default: Date.now }",
      "})",
     `exports.${name} = ${name}`
    ];
  }

  static append(nameOrContent, newContent) {
    super.append(nameOrContent, newContent, "}\\)");
  }
}

module.exports = MongooseManager;
