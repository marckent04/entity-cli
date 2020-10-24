import capitalize from "lodash.capitalize";
import inquirer from "inquirer";
import consola from "consola";
import chalk from "chalk";

import { entityCreationQuestions } from "./questions";
import EntityManager from "../../entity-manager/Mongoose";
import { fileExists } from "../../common/common";
import apCli from "./addProperty";

const cli = async () =>
  inquirer.prompt(entityCreationQuestions()).then(async (answers) => {
    const { name } = answers;
    if (!fileExists(capitalize(name))) {
      EntityManager.create(name);
      consola.success(chalk.green("entity created"));
    } else consola.info(chalk.blueBright(`update ${name}`));

    apCli(name);
  });

export default cli;
