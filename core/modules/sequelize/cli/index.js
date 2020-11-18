const { inquirer } = require("../../common/cli");
const consola = require("consola");
const { entityCreationQuestions } = require("./questions");
const EntityManager = require("../EntityManager");
const { fileExists } = require("../../common/common");
const addCli = require("./add");
const arCli = require("./addRelation");
const apCli = require("./addProperty");

const cli = async () =>
  inquirer.prompt(await entityCreationQuestions()).then(async ({ name }) => {
    if (!fileExists(name)) {
      await EntityManager.create(name);
    } else {
      consola.info(`update ${name}`);
    }
    addCli(name, apCli, arCli);
  });

module.exports = cli;
