const capitalize = require("lodash.capitalize");
const inquirer = require("inquirer");

const { entityCreationQuestions } = require("./questions");
const EntityManager = require("../../entity-manager/TypeOrm");
const { fileExists } = require("../../common/common");
const addCli = require("./add");
const arCli = require("./addRelation");
const apCli = require("./addProperty");

const cli = async () =>
  inquirer.prompt(entityCreationQuestions()).then(async (answers) => {
    const { name } = answers;
    if (!fileExists(capitalize(name))) {
      const { stderr, stdout } = await EntityManager.create(name);
      EntityManager.init(name);
      if (stderr) throw stderr;
      console.log(stdout);
    } else {
      console.log(`update ${name}`);
    }

    addCli(name, apCli, arCli);
  });

module.exports = cli;
