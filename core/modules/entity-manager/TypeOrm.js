const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");
const path = require("path");
const capitalize = require("lodash.capitalize");

const BaseEntityManager = require("./Base");
const { getConfigFile } = require("../common/configFile");
const { linter } = require("../common/linter");

class TypeOrmManager extends BaseEntityManager {
  static init(name) {
    const file = super.init(name);
    const classDeclaration = `export class ${capitalize(
      name
    )} extends BaseEntity {`;

    const classRegex = new RegExp(`export class ${capitalize(name)} {`);

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
    if (file && file.src) src = file.src;

    return await exec(`typeorm entity:create -d ${src} -n ${capitalize(name)}`);
  }

  static append(nameOrContent, newContent) {
    super.append(nameOrContent, newContent, "});");
  }
}

module.exports = TypeOrmManager;
