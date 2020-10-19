const { rootDir, defaultDirectory } = require("./common");
const fs = require("fs");
const path = require("path");
const configFile = path.join(rootDir, "entity-cli.json");

const configFileExists = () => {
  return fs.existsSync(configFile);
};

const getConfigFile = () => {
  if (configFileExists())
    return JSON.parse(fs.readFileSync(configFile).toString());
  return null;
};

const getSrcPathFormConfigFile = () => {
  const config = getConfigFile();
  if (config && config.src) return path.join(rootDir, config.src);
  return defaultDirectory;
};

getDirectoryFromConfigFile = () => {
  const config = getConfigFile();
  if (config && config.src) return path.join(rootDir, config.src);
  return defaultDirectory;
};

entityExistsFromConfigFile = (name) => {
  const dest = path.join(getDirectoryFromConfigFile(), `${name}.entity.ts`);
  if (fs.existsSync(dest)) return true;
  return false;
};

module.exports = {
  getSrcPathFormConfigFile,
  getConfigFile,
  getDirectoryFromConfigFile,
  entityExistsFromConfigFile,
};
