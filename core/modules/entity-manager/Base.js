const fs = require("fs");
const path = require("path");
const Str = require("string");

const { getSrcPathFormConfigFile } = require("../common/configFile");
const { linter } = require("../common/linter");

class BaseEntityManager {
  static directory = getSrcPathFormConfigFile();

  static init(name) {
    return path.join(this.directory, `${Str(name).capitalize().s}.entity.ts`);
  }

  static create(name) {}

  static update(name, content) {
    const file = path.join(
      this.directory,
      `${Str(name).capitalize().s}.entity.ts`
    );
    fs.writeFileSync(file, linter(content));
  }

  static append(nameOrContent, newContent) {
    let content = nameOrContent;
    let file = null;
    if (!Array.isArray(nameOrContent)) {
      file = path.join(
        this.directory,
        `${Str(nameOrContent).capitalize().s}.entity.ts`
      );
      content = fs.readFileSync(file).toString().split("\n");
    }

    const lastIndex = content.lastIndexOf("}");
    content.splice(lastIndex, 0, newContent);
    if (file) fs.writeFileSync(file, linter(content));
    else return content;
  }
}

module.exports = BaseEntityManager;
