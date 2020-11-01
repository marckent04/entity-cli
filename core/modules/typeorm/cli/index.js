const inquirer = require("inquirer");
const consola = require("consola")
const { entityCreationQuestions } = require("./questions");
const EntityManager = require("../EntityManager");
const { fileExists } = require("../../common/common");
const addCli = require("./add");
const arCli = require("./addRelation");
const apCli = require("./addProperty");

const cli = async () =>
  inquirer.prompt(entityCreationQuestions()).then(async ({name}) => {
       if (!fileExists(name)) {
           const { stderr, stdout } = await EntityManager.create(name);
           EntityManager.init(name);
           if (stderr) throw stderr;
           consola.success(stdout);
       } else {
           consola.info(`update ${name}`);
       }
       addCli(name, apCli, arCli);

  });

module.exports =  cli;
