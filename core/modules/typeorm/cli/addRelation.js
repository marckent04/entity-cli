const { addRelationQuestions } = require("./questions");
const { addRelationConstructor } = require("../../common/cli/constructors");
const relationsMaker = require("../makers/relations");
const EntityManager = require("../EntityManager");
const addCli = require("./add");

//entity : entite avec laquelle on etablie la relation (nom variable a cahnger)
const cli = addRelationConstructor({
  questions: addRelationQuestions,
  entityManager: EntityManager,
  relationsMaker,
  addCli,
});

module.exports = cli;
