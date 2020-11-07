const fs = require("fs");
const path = require("path");
const { getSrcPathFormConfigFile } = require("../configFile");

const getModules = () => {
  const src = getSrcPathFormConfigFile();
  try {
    return fs
      .readdirSync(src, { encoding: "utf8" })
      .filter((file) => fs.lstatSync(path.join(src, file)).isDirectory());
  } catch (_) {
    return [];
  }
};

const getRelationModules = (entity) => {
  const src = getSrcPathFormConfigFile();
  try {
    return fs
      .readdirSync(src, { encoding: "utf8" })
      .filter((file) => fs.lstatSync(path.join(src, file)).isDirectory())
      .filter((file) => file != entity);
  } catch (_) {
    return [];
  }
};

const getModuleEntities = () => {};

module.exports = {
  getModules,
  getRelationModules,
};
