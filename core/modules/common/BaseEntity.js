const fs = require("fs");
const path = require("path");
const capitalize = require("lodash.capitalize");
const findLastIndex = require("lodash.findlastindex");
const {
  getSrcPathFormConfigFile,
  getFileExtension,
  getModuleMode,
  getConfigFile,
} = require("./configFile");
const { linter } = require("./linter");
const {
  relativeDefaultDirectory,
  relativeModuleDirectory,
  rootDir,
} = require("./constants");

class BaseEntityManager {
  static get directory() {
    return getSrcPathFormConfigFile();
  }

  static createOrInitSrc(name) {
    const file = getConfigFile();
    let src = "";
    const moduleMode = getModuleMode();
    if (file && file.src) src = file.src;
    src = path.join(
      moduleMode ? relativeModuleDirectory : relativeDefaultDirectory,
      moduleMode ? name : "."
    );
    if (file && file.modulesDir) src = path.join(file.modulesDir, name);
    return src;
  }

  static get fileExtension() {
    return getFileExtension();
  }

  static init(name) {
    return path.join(
      rootDir,
      this.createOrInitSrc(name),
      `${capitalize(name)}.entity.${this.fileExtension}`
    );
  }

  static create(name) {}

  static update(name, content) {
    const mod = getModuleMode() ? name : ".";
    const file = path.join(
      this.directory,
      mod,
      `${capitalize(name)}.entity.${this.fileExtension}`
    );
    fs.writeFileSync(file, linter(content));
  }

  static createPath(entityName) {
    const mod = getModuleMode() ? entityName : ".";
    return path.join(
      this.directory,
      mod,
      `${capitalize(entityName)}.entity.${this.fileExtension}`
    );
  }

  static append(nameOrContent, newContent, endTag) {
    const regex = new RegExp(endTag);
    let content = nameOrContent;
    let file = null;
    if (!Array.isArray(nameOrContent)) {
      file = this.createPath(nameOrContent);
      content = fs.readFileSync(file).toString().split("\n");
    }
    const lastIndex = findLastIndex(content, (line) => regex.test(line));
    content.splice(lastIndex, 0, newContent);
    if (file) fs.writeFileSync(file, linter(content));
    else return content;
  }
}

module.exports = BaseEntityManager;
