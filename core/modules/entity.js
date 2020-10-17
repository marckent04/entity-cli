const fs = require("fs");
const path = require("path");
const util = require("util");
const {
  getSrcPathFormConfigFile,
  getConfigFile,
} = require("./common/configFile");
const Str = require("string");
const exec = util.promisify(require("child_process").exec);
const { linter } = require("./common/linter");
class EntityManager {
  static directory = getSrcPathFormConfigFile();
  static async init(name) {
    const file = path.join(
      this.directory,
      `${Str(name).capitalize().s}.entity.ts`
    );

    const classDeclaration = `export class ${
      Str(name).capitalize().s
    } extends BaseEntity {`;

    const classRegex = new RegExp(`export class ${Str(name).capitalize().s} {`);

    fs.renameSync(path.join(this.directory, `${name}.ts`), file);

    let content = fs.readFileSync(file).toString().split("\n");

    content[0] =
      'import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm"';

    content.splice(
      5,
      0,
      "\t@PrimaryGeneratedColumn()\n\tid: number\n\t@CreateDateColumn()\n\tcreateDate: Date\n\t@UpdateDateColumn()\n\tupdateDate: Date\n"
    );

    content[
      content.findIndex((line) => classRegex.test(line))
    ] = classDeclaration;

    fs.writeFileSync(file, linter(content));
  }

  static async create(name) {
    const file = getConfigFile();
    let src = "src/entities";
    if (file.src) src = file.src;

    return await exec(
      `typeorm entity:create -d ${src} -n ${Str(name).capitalize().s}`
    );
  }

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

module.exports = EntityManager;
