const { baseCliConstructor } = require("../../common/cli/constructors");
const EntityManager = require("../EntityManager");
const apCli = require("./addProperty");

const cli = baseCliConstructor({
  addCli: apCli,
  entityManager: EntityManager,
  addRelationCli: null,
  addPropertyCli: null,
});
module.exports = cli;
