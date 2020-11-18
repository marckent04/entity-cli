const capitalize = require("lodash.capitalize");
const inquirer = require("inquirer");
const consola = require("consola");
const chalk = require("chalk");

const { entityCreationQuestions } = require("./questions");
const EntityManager = require("../EntityManager");
const { fileExists } = require("../../common/common");
const apCli = require("./addProperty");

const cli = async () =>
  inquirer.prompt(entityCreationQuestions()).then(async (answers) => {
    const { name } = answers;
    const exists = await fileExists(name);

    if (!exists) {
      await EntityManager.create(name);
      consola.success(chalk.green("entity created"));
    } else consola.info(chalk.blueBright(`update ${name}`));

    apCli(name);
  });

module.exports = cli;
