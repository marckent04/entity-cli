const inquirer = require("inquirer");
const consola = require("consola");
const chalk = require("chalk");

const { addRelationQuestions } = require("./questions");
const { getEntity } = require("../../common/index");
const relations = require("../makers/relations");
const EntityManager = require("../EntityManager");
const addCli = require("./add");

//entity : entite avec laquelle on etablie la relation (nom variable a cahnger)
const cli = (entityName, apCli) =>
  inquirer.prompt(addRelationQuestions(entityName)).then((answers) => {
    const { entity, relation, add } = answers;
    let result = null;
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

      consola.success(chalk.green("relation etablie"));
      if (add) addCli(entityName, apCli, cli);
    } catch (error) {
      consola.error(error);
    }
  });

module.exports =  cli;
