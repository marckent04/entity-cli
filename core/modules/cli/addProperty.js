const { addPropertyQuestions } = require("../cli/questions");
const inquirer = require("inquirer");
const MakeProperty = require("../make/property");
const addCli = require("./add");
const arCli = require("./addRelation");
const entityManager = require("../entity");

const cli = async (entityName) =>
  inquirer.prompt(addPropertyQuestions(entityName)).then(async (answers) => {
    try {
      const { name, type, add, required } = answers;

      entityManager.append(
        entityName,
        MakeProperty[type](name, required).join("\n")
      );

      if (add) addCli(entityName, cli, arCli);
      else console.log("Bon code a vous !");
    } catch (error) {
      console.log("an error");
      console.log(error);
    }
    // if (answers.add) return addNewProperty(entityName)
  });

module.exports = cli;
