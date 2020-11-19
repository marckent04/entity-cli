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
      "updatedAt: { type: Date, default: Date.now },",
      "createdAt: { type: Date, default: Date.now }",
      "})",
      `export const ${name}Model = model('${name}', ${name})`,
    ];
  }

  static templateJs(name) {}

  static append(nameOrContent, newContent) {
    super.append(nameOrContent, newContent, "}\\)");
  }
}

module.exports = MongooseManager;
