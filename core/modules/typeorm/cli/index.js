const inquirer = require("inquirer");
const consola = require("consola");
const storage = require("node-persist");

const { entityCreationQuestions } = require("./questions");
const EntityManager = require("../EntityManager");
const { fileExists } = require("../../common/common");
const addCli = require("./add");
const arCli = require("./addRelation");
const apCli = require("./addProperty");

const cli = async () =>
  inquirer.prompt(entityCreationQuestions()).then(async ({ name, module }) => {
    const exists = await fileExists(name);

    if (module) await storage.updateItem("currentModule", module);

    if (!exists) {
      await EntityManager.create(name);
    } else {
      consola.info(`update ${name}`);
    }

    addCli(name, apCli, arCli);
  });

module.exports = cli;
