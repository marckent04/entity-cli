const fs = require("fs");
const path = require("path");
const findLastIndex = require("lodash.findlastindex");
const chalk = require("chalk");
const { getEntitiesLocation, getFileExtension } = require("./configFile");
const { linter } = require("./linter");

class BaseEntityManager {
  static async directory() {
    return await getEntitiesLocation();
  }

  static get fileExtension() {
    return getFileExtension();
  }

  static init(name) {
    if (this.fileExtension == "js") return linter(this.templateJs(name));
    return linter(this.templateTs(name));
  }

  static templateJs(name) {
    throw "Not exists"
  }

  static templateTs(name) {
    throw "Not exists"
  }

  static async create(name) {
    const file = path.join(
      await this.directory(),
      `${name}.entity.${this.fileExtension}`
    );

    try {
      fs.writeFileSync(file, this.init(name));
    } catch (error) {
      console.log(error);
      if (error.errno === -2) {
        throw chalk.red("folder not found");
      }
      throw chalk.red("error during entity file generation");
    }
  }

  static update(entityPath, content) {
    fs.writeFileSync(entityPath, linter(content));
  }

  static async createPath(entityName) {
    return path.join(
      await this.directory(),
      `${entityName}.entity.${this.fileExtension}`
    );
  }

  static async append(nameOrContent, newContent, endTag) {
    const regex = new RegExp(endTag);
    let content = nameOrContent;
    let file = null;

    if (Array.isArray(newContent)) {
      newContent = newContent.join("\n");
    }

    if (!Array.isArray(nameOrContent)) {
      file = await this.createPath(nameOrContent);
      content = fs.readFileSync(file).toString().split("\n");
    }
    const lastIndex = findLastIndex(content, (line) => regex.test(line));
    content.splice(lastIndex, 0, newContent);
    if (file) fs.writeFileSync(file, linter(content));
    else return content;
  }
}

module.exports = BaseEntityManager;
