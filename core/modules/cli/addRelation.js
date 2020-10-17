const { addRelationQuestions } = require("../cli/questions");
const { getEntity } = require("../common");
const relations = require("../make/relations");
const inquirer = require("inquirer");
const manager = require("../entity");
const addCli = require("./add");

//entity : entite avec laquelle on etablie la relation (nom variable a cahnger)
const cli = async (entityName, apCli) =>
  inquirer.prompt(addRelationQuestions(entityName)).then(async (answers) => {
    const { entity, relation, add } = answers;
    try {
      switch (relation) {
        case "oto":
          manager.update(
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
          manager.update(entityName, result.one);
          manager.update(entity, result.many);
          break;
        case "mto":
          result = relations.otm(
            getEntity(entity),
            getEntity(entityName),
            entity,
            entityName
          );

          manager.update(entityName, result.many);
          manager.update(entity, result.one);

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
