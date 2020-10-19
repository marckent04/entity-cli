const inquirer = require("inquirer");

const { addRelationQuestions } = require("./questions");
const { getEntity } = require("../../common");
const relations = require("../../make/typeorm/relations");
const EntityManager = require("../../entity-manager/TypeOrm");
const addCli = require("./add");

//entity : entite avec laquelle on etablie la relation (nom variable a cahnger)
const cli = (entityName, apCli) =>
  inquirer.prompt(addRelationQuestions(entityName)).then((answers) => {
    const { entity, relation, add } = answers;
    try {
      switch (relation) {
        case "oto":
          EntityManager.update(
            entityName,
            relations.oto(getEntity(entityName), entity)
          );
          break;
        case "otm":
          result = relations.otm(
            getEntity(entityName),
            getEntity(entity),
            entityName,
            entity
          );
          EntityManager.update(entityName, result.one);
          EntityManager.update(entity, result.many);
          break;
        case "mto":
          result = relations.otm(
            getEntity(entity),
            getEntity(entityName),
            entity,
            entityName
          );

          EntityManager.update(entityName, result.many);
          EntityManager.update(entity, result.one);

          break;
        default:
          break;
      }

      console.log("relation etablie");
      if (add) addCli(entityName, apCli, cli);
    } catch (error) {
      console.log(error);
    }
  });

module.exports = cli;
