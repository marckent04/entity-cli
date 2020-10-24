import inquirer from "inquirer";
import consola from "consola";
import chalk from "chalk";

import { addPropertyQuestions } from "./questions";
import MakeProperty from "../../make/mongoose/property";
import EntityManager from "../../entity-manager/Mongoose";

const cli = (entityName) =>
  inquirer.prompt(addPropertyQuestions(entityName)).then((answers) => {
    try {
      const { name, type, add } = answers;
      EntityManager.append(entityName, MakeProperty[type.toLowerCase()](name));
      consola.success(chalk.green(`the ${name} column has been created `));
      if (add) cli(entityName);
      else consola.info(chalk.blueBright("Good code to you"));
    } catch (error) {
      consola.error(error);
    }
    // if (answers.add) return addNewProperty(entityName)
  });

export default cli;
