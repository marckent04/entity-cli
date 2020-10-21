const fs = require("fs");
const path = require("path");
const util = require("util");
const capitalize = require("lodash.capitalize");
const exec = util.promisify(require("child_process").exec);

const {
  getSrcPathFormConfigFile,
  getConfigFile,
} = require("../common/configFile");
const { linter } = require("./common/linter");

class EntityManager {
  static directory = getSrcPathFormConfigFile();

  static init(name) {}

  static create(name) {}

  static update(name, content) {
    const file = path.join(this.directory, `${capitalize(name)}.entity.ts`);
    fs.writeFileSync(file, linter(content));
  }

  static append(nameOrContent, newContent) {
    let content = nameOrContent;
    let file = null;
    if (!Array.isArray(nameOrContent)) {
      file = path.join(
        this.directory,
        `${capitalize(nameOrContent)}.entity.ts`
      );
      content = fs.readFileSync(file).toString().split("\n");
    }

    const lastIndex = content.lastIndexOf("}");
    content.splice(lastIndex, 0, newContent);
    if (file) fs.writeFileSync(file, linter(content));
    else return content;
  }
}

module.exports = EntityManager;
