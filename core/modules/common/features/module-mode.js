const fs = require("fs");
const path = require("path");
const { getSrcPathFormConfigFile } = require("../configFile");
const getModules = () => {
  try {
    const src = getSrcPathFormConfigFile();
    return fs
      .readdirSync(src, {
        encoding: "utf8",
      })
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

const getEntitiesDir = (module = "", moduleDir = ".", srcDir = "") => {
  const src = srcDir || ".";
  return path.join(moduleDir, module, src);
};

const getModuleEntities = (module) => {};

module.exports = {
  getModules,
  getRelationModules,
  getEntitiesDir,
};
