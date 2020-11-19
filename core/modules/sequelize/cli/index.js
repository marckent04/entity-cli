const EntityManager = require("../EntityManager");
const addCli = require("./add");
const arCli = require("./addRelation");
const apCli = require("./addProperty");
const { baseCliConstructor } = require("../../common/cli/constructors");

const cli = baseCliConstructor({
  addCli,
  addPropertyCli: apCli,
  addRelationCli: arCli,
  entityManager: EntityManager,
});

module.exports = cli;
