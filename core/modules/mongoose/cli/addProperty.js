const { inquirer } = require("../../common/cli");

const consola = require("consola");
const chalk = require("chalk");

const { addPropertyQuestions } = require("./questions");
const MakeProperty = require("../makers/property");
const EntityManager = require("../EntityManager");

const cli = (entityName) =>
  inquirer.prompt(addPropertyQuestions(entityName)).then((answers) => {
    try {
      const { name, type, add } = answers;
      EntityManager.append(entityName, MakeProperty[type.toLowerCase()](name));
      consola.success(chalk.green(`the ${name} column has been created `));
      if (add) cli(entityName);
    } catch (error) {
      consola.error(error);
    }
    // if (answers.add) return addNewProperty(entityName)
  });

module.exports = cli;
