const util = require("util");
const fs = require("fs");
const path = require("path");
const capitalize = require("lodash.capitalize");
const { exec: executable } = require("child_process");

const BaseEntityManager = require("../common/BaseEntity");
const { linter } = require("../common/linter");
const { getModuleMode } = require("../common/configFile");

const exec = util.promisify(executable);

class TypeOrmManager extends BaseEntityManager {
  static init(name) {
    const file = super.init(name);
    const classDeclaration = `export class ${capitalize(
      name
    )} extends BaseEntity {`;

    const classRegex = new RegExp(`export class ${capitalize(name)} {`);

    fs.renameSync(
      path.join(
        this.directory,
        getModuleMode() ? name : ".",
        `${capitalize(name)}.${super.fileExtension}`
      ),
      file
    );

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
    const src = this.createOrInitSrc(name);
    return await exec(`typeorm entity:create -d ${src} -n ${capitalize(name)}`);
  }

  static append(nameOrContent, newContent) {
    return super.append(nameOrContent, newContent, "}");
  }
}

module.exports = TypeOrmManager;
