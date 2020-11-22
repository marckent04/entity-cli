const { baseCliConstructor } = require("../../common/cli/constructors");
const EntityManager = require("../EntityManager");
const apCli = require("./addProperty");
const arCli = require("./addRelation");
const addCli = require("./add");

const cli = baseCliConstructor({
  addCli,
  entityManager: EntityManager,
  addRelationCli: arCli,
  addPropertyCli: apCli,
});
module.exports = cli;
