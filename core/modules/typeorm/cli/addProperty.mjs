import inquirer from "inquirer";
import consola from "consola";
import chalk from "chalk";

import { addPropertyQuestions } from "./questions.mjs";
import MakeProperty from "../makers/property.mjs";
import addCli from "./add.mjs";
import EntityManager from "../EntityManager.mjs";

const cli = (entityName, arCli) =>
  inquirer.prompt(addPropertyQuestions(entityName)).then((answers) => {
    try {
      const { name, type, add, required } = answers;
      EntityManager.append(
        entityName,
        MakeProperty[type](name, required).join("\n")
      );
      consola.success(chalk.green(`the ${name} column has been created `));
      if (add) addCli(entityName, cli, arCli);
      else consola.info(chalk.blueBright("Good code to you"));
    } catch (error) {
      consola.error(error);
    }
  });

export default cli;
