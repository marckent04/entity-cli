const fs = require("fs");
const path = require("path");

const { rootDir, defaultDirectory, moduleDefaultDirectory } = require("./constants");


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

export const getConfigFile = () => {
  if (configFileExists())
    return JSON.parse(fs.readFileSync(configFile).toString());
  return null;
};

export const getModuleMode = () => {
  const file = getConfigFile()
  return !!(file && file.mode && (file.mode === "module"))
}

export const getSrcPathFormConfigFile = () => {
  const config = getConfigFile();
  if (getModuleMode())
    return (config.modulesDir) ? path.join(rootDir, config.modulesDir): moduleDefaultDirectory

  return (config && config.src) ? path.join(rootDir, config.src) : defaultDirectory;
};
export const getRelativePathFormConfigFile = () => {
  const config = getConfigFile();
  if (getModuleMode())
    return (config.modulesDir) ? config.modulesDir: moduleDefaultDirectory

  return (config && config.src) ? path.join(rootDir, config.src) : defaultDirectory;
};

export const getDirectoryFromConfigFile = () => {
  const config = getConfigFile();
  if (config && config.src) return path.join(rootDir, config.src);
  return defaultDirectory;
};

export const entityExistsFromConfigFile = (name) => {
  const dest = path.join(getDirectoryFromConfigFile(), `${name}.entity.ts`);
  if (fs.existsSync(dest)) return true;
  return false;
};

export const getFileExtension = () => {
  const config = getConfigFile();
  if (getOrm() !== "typeorm" && config && config.lang && config.lang === "js")
    return "js";
  return "ts";
};

export const getModuleSrc = () => {
  const file = getConfigFile()
  return (file && file.moduleSrc) ? file.moduleSrc : "."
}

