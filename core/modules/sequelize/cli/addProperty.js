const inquirer = require("inquirer");
const consola = require("consola");
const chalk = require("chalk");

const { addPropertyQuestions } = require("./questions");
const MakeProperty = require("../makers/property");
const addCli = require("./add");
const EntityManager = require("../EntityManager");

const cli = (entityName, arCli) =>
  inquirer.prompt(addPropertyQuestions(entityName)).then((answers) => {
    try {
      const { name, type, add, required } = answers;
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

module.exports =  cli;
