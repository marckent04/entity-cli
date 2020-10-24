import inquirer from "inquirer";
import consola from "consola";
import chalk from "chalk";

import { addRelationQuestions } from "./questions";
import { getEntity } from "../../common";
import relations from "../../make/typeorm/relations";
import EntityManager from "../../entity-manager/TypeOrm";
import addCli from "./add";

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

export default cli;
