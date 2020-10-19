const inquirer = require("inquirer");

const { addPropertyQuestions } = require("./questions");
const MakeProperty = require("../../make/typeorm/property");
const addCli = require("./add");
const EntityManager = require("../../entity-manager/TypeOrm");

const cli = (entityName, arCli) =>
  inquirer.prompt(addPropertyQuestions(entityName)).then((answers) => {
    try {
      const { name, type, add, required } = answers;

      EntityManager.append(
        entityName,
        MakeProperty[type](name, required).join("\n")
      );

      if (add) addCli(entityName, cli, arCli);
      else console.log("Good code to you");
    } catch (error) {
      console.log(error);
    }
    // if (answers.add) return addNewProperty(entityName)
  });

module.exports = cli;
