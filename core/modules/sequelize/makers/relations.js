const capitalize = require("lodash.capitalize");

const { addOrmImport, addEntityImport } = require("../../common/import");

const EntityManager = require("../EntityManager");
const { sequelize } = require("../../common/destructuringBreakpoints");

class Maker {
  static async otmCommon(
    oneContent,
    manyContent,
    entityName,
    relationEntityName,
    oneRelativePath,
    manyRelativePath
  ) {
    const one = {
      ormImport: ["HasMany"],
      newContent: [
        "",
        `@HasMany(() =>  ${capitalize(relationEntityName)})`,
        `${relationEntityName.toLowerCase()}s: ${capitalize(
          relationEntityName
        )}[];`,
      ],
    };

    const many = {
      ormImport: ["ForeignKey", "BelongsTo"],
      newContent: [
        "",
        `@ForeignKey(() => ${capitalize(entityName)})`,
        "@Column",
        `${entityName.toLowerCase()}Id: number;`,
        "",
        `@BelongsTo(() => ${capitalize(entityName)})`,
        `${entityName.toLowerCase()}: ${capitalize(entityName)}`,
      ],
    };

    return {
      one: await this.common(
        oneContent,
        relationEntityName,
        one.ormImport,
        one.newContent,
        oneRelativePath
      ),
      many: await this.common(
        manyContent,
        entityName,
        many.ormImport,
        many.newContent,
        manyRelativePath
      ),
    };
  }

  static addSequelizeImportTs(entityContent, ormImport) {
    return addOrmImport("sequelize-typescript")(entityContent, ormImport);
  }

  static async common(
    entityContent,
    relationEntity,
    ormImport,
    newContent,
    entityToImportRelativePath
  ) {
    const content = addEntityImport(
      this.addSequelizeImportTs(entityContent, ormImport),
      relationEntity,
      sequelize,
      entityToImportRelativePath
    );
    console.log(content);
    console.log(newContent);
    return await EntityManager.append(content, newContent.join("\n"));
  }

  static oto(entityContent, relationEntity) {
    throw new Error("Fonctionnalite pas encore disponible");

    const newContent = [
      `@OneToOne(type => ${capitalize(relationEntity)})`,
      "@JoinColumn()",
      `${relationEntity.toLowerCase()}: ${capitalize(relationEntity)};`,
    ];

    return this.common(
      entityContent,
      relationEntity,
      ["OneToOne", "JoinColumn"],
      newContent
    );
  }

  static async otm(
    entityContent,
    relationContent,
    entity,
    relationEntity,
    oneRelativePath,
    manyRelativePath
  ) {
    return await this.otmCommon(
      entityContent,
      relationContent,
      entity,
      relationEntity,
      oneRelativePath,
      manyRelativePath
    );

    // throw new Error("Fonctionnalite pas encore disponible");
  }

  static mtm(name, required) {
    throw new Error("Fonctionnalite pas encore disponible");
  }
}

module.exports = Maker;
