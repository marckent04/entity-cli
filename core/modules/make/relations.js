const { addEntityImport, addTypeOrmImport } = require("../common/import");
const manager = require("../entity");
const Str = require("string");
class Maker {
  static otmCommon(oneContent, manyContent, entityName, relationEntityName) {
    entityName = Str(entityName).capitalize().s;
    relationEntityName = Str(relationEntityName).capitalize().s;

    const one = {
      typeOrmImport: ["OneToMany"],
      newContent: [
        `\n\t@OneToMany(type =>  ${relationEntityName},  ${relationEntityName.toLowerCase()} => ${relationEntityName.toLowerCase()}.${entityName.toLowerCase()})`,
        `\t${relationEntityName.toLowerCase()}s: ${relationEntityName}[];`,
      ],
    };

    const many = {
      typeOrmImport: ["ManyToOne"],
      newContent: [
        `\n\t@ManyToOne(type => ${entityName}, ${entityName.toLowerCase()} => ${entityName.toLowerCase()}.${relationEntityName.toLowerCase()}s)`,
        `\t${entityName.toLowerCase()}: ${entityName}`,
      ],
    };

    return {
      one: this.common(
        oneContent,
        relationEntityName,
        one.typeOrmImport,
        one.newContent
      ),
      many: this.common(
        manyContent,
        entityName,
        many.typeOrmImport,
        many.newContent
      ),
    };
  }

  static common(entityContent, relationEntity, typeOrmImport, newContent) {
    const content = addEntityImport(
      addTypeOrmImport(entityContent, typeOrmImport),
      relationEntity
    );

    return manager.append(content, newContent.join("\n")).join("\n");
  }

  static oto(entityContent, relationEntity) {
    // console.log("----begin content ---");
    // console.log(entityContent);
    // console.log(" ----end content------");
    const newContent = [
      `\t@OneToOne(type => ${relationEntity})`,
      "\t@JoinColumn()",
      `\t${relationEntity.toLowerCase()}: ${relationEntity};`,
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

  static mto(name, required) {
    throw new Error("Fonctionnalite pas encore disponible");
  }

  static mtm(name, required) {
    throw new Error("Fonctionnalite pas encore disponible");
  }
}
module.exports = Maker;
