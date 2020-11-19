const { addPropertyQuestions } = require("./questions");
const MakeProperty = require("../makers/property");
const addCli = require("./add");
const EntityManager = require("../EntityManager");
const { addPropertyConstructor } = require("../../common/cli/constructors");

const cli = addPropertyConstructor({
  entityManager: EntityManager,
  makerProperty: MakeProperty,
  questions: addPropertyQuestions,
  addCli,
});

module.exports = cli;
