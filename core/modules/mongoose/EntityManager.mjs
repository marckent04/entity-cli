import capitalize from "lodash.capitalize";
import fs from "fs";
import * as path from "path";
import chalk from "chalk";
import BaseEntityManager from "../common/BaseEntity.mjs";
import { getSrcPathFormConfigFile } from "../common/configFile.mjs";
import { linter } from "../common/linter.mjs";

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
      "_id: Types.ObjectId,",
      "})",
      `export const ${name}Model = model('${name}', ${name})`,
    ];
  }

  static create(name) {
    const file = path.join(
      getSrcPathFormConfigFile(),
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
