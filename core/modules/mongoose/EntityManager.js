const capitalize = require("lodash.capitalize";
const fs = require("fs";
const * as path = require("path";
const chalk = require("chalk";
const BaseEntityManager = require("../common/BaseEntity.mjs";
const { getSrcPathFormConfigFile } = require("../common/configFile.mjs";
const { linter } = require("../common/linter.mjs";

class MongooseManager extends BaseEntityManager {
  static init(name) {
    return linter(this.template(name));
  }

  static template(name) {
    name = capitalize(name);
    return [
      "const {Schema, Types, model } from 'mongoose'",
      "",
      `const ${name} = new Schema({`,
      "_id: Types.ObjectId,",
      "})",
      `export const ${name}Model = model('${name}', ${name})`,
    ];
  }

  static create(name) {
    const file = path.join(
      this.createOrInitSrc(name),
      `${capitalize(name)}.entity.${super.fileExtension}`
    );
    // console.log("ici");
    // console.log(file);
    // console.log(this.init(name));
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

export default MongooseManager;
