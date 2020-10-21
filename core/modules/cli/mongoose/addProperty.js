const inquirer = require("inquirer");

const { addPropertyQuestions } = require("./questions");
const MakeProperty = require("../../make/mongoose/property");
const EntityManager = require("../../entity-manager/Mongoose");

const cli = (entityName) =>
  inquirer.prompt(addPropertyQuestions(entityName)).then((answers) => {
    try {
      const { name, type, add } = answers;
      EntityManager.append(entityName, MakeProperty[type.toLowerCase()](name));

      if (add) cli(entityName);
      else console.log("Good code to you");
    } catch (error) {
      console.log(error);
    }
    // if (answers.add) return addNewProperty(entityName)
  });

module.exports = cli;
