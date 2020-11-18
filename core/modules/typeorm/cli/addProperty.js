const { inquirer } = require("../../common/cli");
const consola = require("consola");
const chalk = require("chalk");
const storage = require("node-persist");

const { addPropertyQuestions } = require("./questions");
const MakeProperty = require("../makers/property");
const addCli = require("./add");
const EntityManager = require("../EntityManager");

const cli = (entityName, arCli) =>
  inquirer.prompt(addPropertyQuestions(entityName)).then(async (answers) => {
    try {
      const { name, type, add, required } = answers;
      console.log(await storage.getItem("currentModule"));
      EntityManager.append(
        entityName,
        MakeProperty[type](name, required).join("\n")
      );
      consola.success(chalk.green(`the ${name} column has been created `));
      if (add) addCli(entityName, cli, arCli);
      else consola.info(chalk.blueBright("Good code to you"));
    } catch (error) {
      consola.error(error);
    }
  });

module.exports = cli;
