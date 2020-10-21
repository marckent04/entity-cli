const capitalize = require("lodash.capitalize");
const inquirer = require("inquirer");

const { entityCreationQuestions } = require("./questions");
const EntityManager = require("../../entity-manager/Mongoose");
const { fileExists } = require("../../common/common");
const apCli = require("./addProperty");

const cli = async () =>
  inquirer.prompt(entityCreationQuestions()).then(async (answers) => {
    const { name } = answers;
    if (!fileExists(capitalize(name))) {
      EntityManager.create(name);
      console.log("entity created");
    } else {
      console.log(`update ${name}`);
    }

    apCli(name);
  });

module.exports = cli;
