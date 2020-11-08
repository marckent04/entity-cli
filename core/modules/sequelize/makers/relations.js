const capitalize = require("lodash.capitalize");

const { addOrmImport, addEntityImport } = require("../../common/import");

const EntityManager = require("../EntityManager");
const { sequelize } = require("../../common/destructuringBreakpoints");

class Maker {
  static otmCommon(oneContent, manyContent, entityName, relationEntityName) {
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
      one: this.common(
        oneContent,
        relationEntityName,
        one.ormImport,
        one.newContent
      ),
      many: this.common(
        manyContent,
        entityName,
        many.ormImport,
        many.newContent
      ),
    };
  }

  static addSequelizeImportTs(entityContent, ormImport) {
    return addOrmImport("sequelize-typescript")(entityContent, ormImport);
  }

  static common(entityContent, relationEntity, ormImport, newContent) {
    const content = addEntityImport(
      this.addSequelizeImportTs(entityContent, ormImport),
      relationEntity,
      sequelize
    );

    return EntityManager.append(content, newContent.join("\n")).join("\n");
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

  static otm(entityContent, relationContent, entity, relationEntity) {
    return this.otmCommon(
      entityContent,
      relationContent,
      entity,
      relationEntity
    );

    // throw new Error("Fonctionnalite pas encore disponible");
  }

  static mtm(name, required) {
    throw new Error("Fonctionnalite pas encore disponible");
  }
}

module.exports = Maker;
