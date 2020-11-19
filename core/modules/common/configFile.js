const fs = require("fs");
const path = require("path");
const storage = require("node-persist");
const {
  rootDir,
  defaultDirectory,
  moduleDefaultDirectory,
} = require("./constants");

const configFile = path.join(rootDir, "entity-cli.json");

const configFileExists = () => {
  return fs.existsSync(configFile);
};

const getOrm = () => {
  const config = getConfigFile();
  let orm = "typeorm";

  if (config && config.orm) {
    switch (config.orm) {
      case "sequelize":
      case "mongoose":
        orm = config.orm;
    }
  }

  return orm;
};

const getConfigFile = () => {
  if (configFileExists())
    return JSON.parse(fs.readFileSync(configFile).toString());
  return null;
};

const getModuleMode = () => {
  const file = getConfigFile();
  return !!(file && file.mode && file.mode === "module");
};

const getSrcPathFormConfigFile = () => {
  const config = getConfigFile();
  if (getModuleMode())
    return config.modulesDir
      ? path.join(rootDir, config.modulesDir)
      : moduleDefaultDirectory;

  return config && config.src
    ? path.join(rootDir, config.src)
    : defaultDirectory;
};

const getEntitiesLocation = async (mod = null) => {
  const directoryPath = getSrcPathFormConfigFile();
  let src = ".";
  if (!mod) mod = await storage.getItem("currentModule");
  const config = getConfigFile();
  if (config && config.src) src = config.src;

  if (getModuleMode()) return path.join(directoryPath, mod, src);
  return directoryPath;
};

const getRelativePathFormConfigFile = () => {
  const config = getConfigFile();
  if (getModuleMode())
    return config.modulesDir ? config.modulesDir : moduleDefaultDirectory;

  return config && config.src
    ? path.join(rootDir, config.src)
    : defaultDirectory;
};

const getDirectoryFromConfigFile = () => {
  const config = getConfigFile();
  if (config && config.src) return path.join(rootDir, config.src);
  return defaultDirectory;
};

const entityExistsFromConfigFile = (name) => {
  const dest = path.join(getDirectoryFromConfigFile(), `${name}.entity.ts`);
  if (fs.existsSync(dest)) return true;
  return false;
};

const getFileExtension = () => {
  const config = getConfigFile();
  if (config && config.lang && config.lang === "js") return "js";
  return "ts";
};

const getModuleSrc = () => {
  const file = getConfigFile();
  return file && file.moduleSrc ? file.moduleSrc : ".";
};

module.exports = {
  getConfigFile,
  getModuleMode,
  getSrcPathFormConfigFile,
  getDirectoryFromConfigFile,
  getFileExtension,
  getRelativePathFormConfigFile,
  entityExistsFromConfigFile,
  getModuleSrc,
  getEntitiesLocation,
};
