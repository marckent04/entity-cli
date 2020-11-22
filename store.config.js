const storage = require("node-persist");

const config = {
  dir: "./node_modules/entity-cli",

  stringify: JSON.stringify,

  parse: JSON.parse,

  encoding: "utf8",

  logging: false, // can also be custom logging function

  ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS or a valid Javascript Date object

  expiredInterval: 2 * 60 * 1000, // every 2 minutes the process will clean-up the expired cache

  // in some cases, you (or some other service) might add non-valid storage files to your
  // storage dir, i.e. Google Drive, make this true if you'd like to ignore these files and not throw an error
  forgiveParseErrors: false,
};

const destroy = async () => {
  await storage.clear();
};

const init = async () => {
  await storage.init(config);
  await storage.setItem("currentModule", ".");
};

module.exports = { init, destroy };
