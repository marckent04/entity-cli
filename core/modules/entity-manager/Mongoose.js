const util = require("util");
const exec = util.promisify(require("child_process").exec);
const capitalize = require("lodash.capitalize");
const fs = require("fs");
const path = require("path");

const BaseEntityManager = require("./Base");
const { getConfigFile } = require("../common/configFile");
const { linter } = require("../common/linter");

class MongooseManager extends BaseEntityManager {
  static init(name) {}

  static template(name) {
    return [
      "import {Schema} from 'mongoose'",
      ` const ${capitalize(name)} = new Schema({})`,
    ];
  }

  static async create(name) {
    const file = getConfigFile();
    let src = "src/entities";
    if (file && file.src) src = file.src;

    return await exec(`typeorm entity:create -d ${src} -n ${capitalize(name)}`);
  }
}

module.exports = MongooseManager;
