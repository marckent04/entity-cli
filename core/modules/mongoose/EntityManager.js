const BaseEntityManager = require("../common/BaseEntity");
const { linter } = require("../common/linter");
const fs = require("fs");
const capitalize = require("lodash.capitalize");
class MongooseManager extends BaseEntityManager {
  static init(name) {
    return linter(this.template(name));
  }

  static templateJs(name) {
    return `
      import * as mongoose from 'mongoose'
      
      export const ${name} = new mongoose.Schema({
        updatedAt: { type: Date, default: Date.now },
       createdAt: { type: Date, default: Date.now }
      })
    `;
  }

  static templateTs(name) {
    return `
      import * as mongoose from 'mongoose'
      
      export interface ${name}Interface extends mongoose.Document {
        updatedAt: Date;
        createdAt: Date;
      }

      export const ${name} = new mongoose.Schema({
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now }
      })
    `;
  }

  static append(nameOrContent, newContent) {
    super.append(nameOrContent, newContent.entity, "}\\)");

    if (super.fileExtension == "ts") {
      this.appendInterface(nameOrContent, newContent.model);
    }
  }

  static async appendInterface(nameOrContent, newContent) {
    let file = null;
    let content = null;

    const regex = new RegExp(
      `export interface ${capitalize(
        nameOrContent
      )}Interface extends mongoose.Document {`
    );

    if (Array.isArray(newContent)) {
      newContent = newContent.join("\n");
    }

    if (!Array.isArray(nameOrContent)) {
      file = await this.createPath(nameOrContent);
      content = fs.readFileSync(file).toString().split("\n");
    }
    const index = content.findIndex((line) => regex.test(line));

    content.splice(index + 1, 0, newContent);

    if (file) fs.writeFileSync(file, linter(content));
    else return content;
  }
}

module.exports = MongooseManager;
