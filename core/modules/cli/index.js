const { entityCreationQuestions } = require("./questions");
const entityManager = require("../entity");
const { fileExists } = require("../common/common");
const addCli = require("./add");
const inquirer = require("inquirer");
const arCli = require("./addRelation");
const apCli = require("./addProperty");
const Str = require("string");

const cli = async () =>
  inquirer.prompt(entityCreationQuestions).then(async (answers) => {
    const { name } = answers;
    if (!fileExists(Str(name).capitalize().s)) {
      const { stderr, stdout } = await entityManager.create(name);
      entityManager.init(name);
      if (stderr) throw stderr;
      console.log(stdout);
    } else {
      console.log(`mise a jour de ${name}`);
    }

    addCli(name, apCli, arCli);
  });

module.exports = cli;
