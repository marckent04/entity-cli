import capitalize from "lodash.capitalize";
import inquirer from "inquirer";
import consola from "consola";
import chalk from "chalk";

import { entityCreationQuestions } from "./questions.mjs";
import EntityManager from "../EntityManager.mjs";
import { fileExists } from "../../common/common.mjs";
import apCli from "./addProperty.mjs";

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
