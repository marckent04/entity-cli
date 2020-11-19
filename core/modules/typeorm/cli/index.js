const { baseCliConstructor } = require("../../common/cli/constructors");
const EntityManager = require("../EntityManager");
const addCli = require("./add");
const arCli = require("./addRelation");
const apCli = require("./addProperty");

const cli = baseCliConstructor({
  entityManager: EntityManager,
  addCli,
  addPropertyCli: apCli,
  addRelationCli: arCli,
});

module.exports = cli;
