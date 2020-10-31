import * as fs from "fs";
import * as path from "path";
import capitalize from "lodash.capitalize";
import findLastIndex from "lodash.findlastindex";
import {
  getSrcPathFormConfigFile,
  getFileExtension,
} from "./configFile.mjs";
import { linter } from "./linter.mjs";

class BaseEntityManager {
  static get directory() {
    return getSrcPathFormConfigFile();
  }

  static get fileExtension() {
    return getFileExtension();
  }

  static init(name) {
    return path.join(
      this.directory,
      `${capitalize(name)}.entity.${this.fileExtension}`
    );
  }

  static create(name) {}

  static update(name, content) {
    const file = path.join(
      this.directory,
      `${capitalize(name)}.entity.${this.fileExtension}`
    );
    fs.writeFileSync(file, linter(content));
  }

  static append(nameOrContent, newContent, endTag) {
    const regex = new RegExp(endTag);
    let content = nameOrContent;
    let file = null;
    if (!Array.isArray(nameOrContent)) {
      file = path.join(
        this.directory,
        `${capitalize(nameOrContent)}.entity.${this.fileExtension}`
      );
      content = fs.readFileSync(file).toString().split("\n");
    }
    // console.log(endTag);
    const lastIndex = findLastIndex(content, (line) => regex.test(line));
    // console.log(lastIndex);
    content.splice(lastIndex, 0, newContent);
    if (file) fs.writeFileSync(file, linter(content));
    else return content;
  }
}

export default BaseEntityManager;
