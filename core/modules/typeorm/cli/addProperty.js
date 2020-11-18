const { inquirer } = require("../../common/cli");
const consola = require("consola");
const chalk = require("chalk");
const { addPropertyConstructor } = require("../../common/cli/constructors");
const { addPropertyQuestions } = require("./questions");
const MakeProperty = require("../makers/property");
const addCli = require("./add");
const EntityManager = require("../EntityManager");

const cli = addPropertyConstructor({
  entityManager: EntityManager,
  makerProperty: MakeProperty,
  questions: addPropertyQuestions,
  addCli,
});

module.exports = cli;
