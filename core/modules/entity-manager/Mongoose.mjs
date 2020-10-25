import capitalize from "lodash.capitalize";
import * as fs from "fs";
import * as path from "path";

import BaseEntityManager from "./Base.mjs";
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

    fs.writeFileSync(file, this.init(name));
  }

  static append(nameOrContent, newContent) {
    super.append(nameOrContent, newContent, "}\\)");
  }
}

export default MongooseManager;
