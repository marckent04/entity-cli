const inquirer = require("inquirer";
const consola = require("consola";
const chalk = require("chalk";

const { addPropertyQuestions } = require("./questions.mjs";
const MakeProperty = require("../makers/property.mjs";
const EntityManager = require("../EntityManager.mjs";

const cli = (entityName) =>
  inquirer.prompt(addPropertyQuestions(entityName)).then((answers) => {
    try {
      const { name, type, add } = answers;
      EntityManager.append(entityName, MakeProperty[type.toLowerCase()](name));
      consola.success(chalk.green(`the ${name} column has been created `));
      if (add) cli(entityName);
      else consola.info(chalk.blueBright("Good code to you"));
    } catch (error) {
      consola.error(error);
    }
    // if (answers.add) return addNewProperty(entityName)
  });

export default cli;
