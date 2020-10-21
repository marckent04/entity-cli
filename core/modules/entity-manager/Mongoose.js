const capitalize = require("lodash.capitalize");
const fs = require("fs");
const path = require("path");

const BaseEntityManager = require("./Base");
const { getSrcPathFormConfigFile } = require("../common/configFile");
const { linter } = require("../common/linter");

class MongooseManager extends BaseEntityManager {
  static init(name) {
    return linter(this.template(name));
  }

  static template(name) {
    return [
      "import {Schema, Types} from 'mongoose'",
      "",
      `export const ${capitalize(name)} = new Schema({`,
      "id: Types.ObjectId,",
      "})",
    ];
  }

  static create(name) {
    const file = path.join(
      getSrcPathFormConfigFile(),
      `${capitalize(name)}.entity.ts`
    );

    fs.writeFileSync(file, this.init(name));
  }

  static append(nameOrContent, newContent) {
    super.append(nameOrContent, newContent, "}\\)");
  }
}

module.exports = MongooseManager;
