import capitalize from "lodash.capitalize";
import inquirer from "inquirer";
import consola from "consola";
import chalk from "chalk";

import { entityCreationQuestions } from "./questions.js";
import EntityManager from "../../entity-manager/Mongoose.js";
import { fileExists } from "../../common/common.js";
import apCli from "./addProperty.js";

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
