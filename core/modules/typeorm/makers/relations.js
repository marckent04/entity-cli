const capitalize = require("lodash.capitalize");

const { addEntityImport, addOrmImport } = require("../../common/import");
const EntityManager = require("../EntityManager");
const { typeORM } = require("../../common/destructuringBreakpoints");

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
      typeOrmImport: ["OneToMany"],
      newContent: [
        `\n\t@OneToMany(type =>  ${capitalize(
          relationEntityName
        )},  ${relationEntityName.toLowerCase()} => ${relationEntityName.toLowerCase()}.${entityName.toLowerCase()})`,
        `\t${relationEntityName.toLowerCase()}s: ${capitalize(
          relationEntityName
        )}[];`,
      ],
    };

    const many = {
      typeOrmImport: ["ManyToOne"],
      newContent: [
        `\n\t@ManyToOne(type => ${capitalize(
          entityName
        )}, ${entityName.toLowerCase()} => ${entityName.toLowerCase()}.${relationEntityName.toLowerCase()}s)`,
        `\t${entityName.toLowerCase()}: ${capitalize(entityName)}`,
      ],
    };

    return {
      one: await this.common(
        oneContent,
        relationEntityName,
        one.typeOrmImport,
        one.newContent,
        oneRelativePath
      ),
      many: await this.common(
        manyContent,
        entityName,
        many.typeOrmImport,
        many.newContent,
        manyRelativePath
      ),
    };
  }
  static addTypeOrmImport = (entityContent, toImport) => {
    return addOrmImport("typeorm")(entityContent, toImport);
  };

  static async common(
    entityContent,
    relationEntity,
    typeOrmImport,
    newContent,
    entityToImportRelativePath
  ) {
    const content = addEntityImport(
      this.addTypeOrmImport(entityContent, typeOrmImport),
      relationEntity,
      typeORM,
      entityToImportRelativePath
    );

    const result = await EntityManager.append(content, newContent);
    return result.join("\n");
  }

  static async oto(entityContent, relationEntity, entityToImportRelativePath) {
    const newContent = [
      `\t@OneToOne(type => ${capitalize(relationEntity)})`,
      "\t@JoinColumn()",
      `\t${relationEntity.toLowerCase()}: ${capitalize(relationEntity)};`,
    ];

    return await this.common(
      entityContent,
      relationEntity,
      ["OneToOne", "JoinColumn"],
      newContent,
      entityToImportRelativePath
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
