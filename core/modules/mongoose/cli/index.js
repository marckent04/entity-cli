const capitalize = require("lodash.capitalize";
const inquirer = require("inquirer";
const consola = require("consola";
const chalk = require("chalk";

const { entityCreationQuestions } = require("./questions.mjs";
const EntityManager = require("../EntityManager.mjs";
const { fileExists } = require("../../common/common.mjs";
const apCli = require("./addProperty.mjs";

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
