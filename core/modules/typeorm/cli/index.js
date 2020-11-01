const inquirer = require("inquirer";
const consola = require("consola"
const { entityCreationQuestions } = require("./questions.mjs";
const EntityManager = require("../EntityManager.mjs";
const { fileExists } = require("../../common/common.mjs";
const addCli = require("./add.mjs";
const arCli = require("./addRelation.mjs";
const apCli = require("./addProperty.mjs";

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

export default cli;
