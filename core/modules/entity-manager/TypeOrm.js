const util = require("util");
const exec = util.promisify(require("child_process").exec);
const Str = require("string");
const fs = require("fs");
const path = require("path");

const BaseEntityManager = require("./Base");
const { getConfigFile } = require("../common/configFile");
const { linter } = require("../common/linter");

class TypeOrmManager extends BaseEntityManager {
  static init(name) {
    const file = super.init(name);
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
    if (file && file.src) src = file.src;

    return await exec(
      `typeorm entity:create -d ${src} -n ${Str(name).capitalize().s}`
    );
  }
}

module.exports = TypeOrmManager;
