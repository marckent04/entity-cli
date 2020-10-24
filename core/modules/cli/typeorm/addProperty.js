import inquirer from "inquirer";
import consola from "consola";
import chalk from "chalk";

import { addPropertyQuestions } from "./questions";
import MakeProperty from "../../make/typeorm/property";
import addCli from "./add";
import EntityManager from "../../entity-manager/TypeOrm";

const cli = (entityName, arCli) =>
  inquirer.prompt(addPropertyQuestions(entityName)).then((answers) => {
    try {
      const { name, type, add, required } = answers;

      EntityManager.append(
        entityName,
        MakeProperty[type](name, required).join("\n")
      );

      if (add) addCli(entityName, cli, arCli);
      else consola.info(chalk.blueBright("Good code to you"));
    } catch (error) {
      consola.error(error);
    }
  });

export default cli;
