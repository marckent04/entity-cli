const fs = require("fs");
const path = require("path");
const capitalize = require("lodash.capitalize");
const storage = require("node-persist");

const {
  getSrcPathFormConfigFile,
  getModuleMode,
  getEntitiesLocation,
} = require("./configFile");
const { getFileExtension } = require("./configFile");

const directory = getSrcPathFormConfigFile();

const fileExtension = getFileExtension();

const filterEntities = (files) => {
  return files
    .map((file) => {
      if (file.split(".")[1] === "entity") return file.split(".")[0];
    })
    .filter((file) => file !== undefined);
};

const getEntity = (name) => {
  const mod = getModuleMode() ? name : ".";
  return fs
    .readFileSync(
      path.join(directory, mod, `${capitalize(name)}.entity.${fileExtension}`)
    )
    .toString()
    .split("\n");
};

const updateEntity = (name, content) => {};

const existingEntities = async (currentEntity, module = null, all = false) => {
  let entities = fs.readdirSync(await getEntitiesLocation(module));

  if (!all) {
    entities = entities.filter(
      (entity) => entity !== `${currentEntity}.entity.${fileExtension}`
    );
  }

  return filterEntities(entities);
};

const entityDestructuring = (entityContent, breakpoint) => {
  const regex = new RegExp(breakpoint);

  const separator = entityContent.findIndex((line) => regex.test(line));

  return {
    imports: entityContent.slice(0, separator).filter((line) => line !== ""),
    body: entityContent.slice(separator),
  };
};

const entityPropertyExists = (entityContent, breakpoint, property) => {
  const test = new RegExp(`${property}:`);
  const { body } = entityDestructuring(entityContent, breakpoint);
  return body.find((line) => test.test(line));
};

module.exports = {
  filterEntities,
  getEntity,
  existingEntities,
  entityDestructuring,
  entityPropertyExists,
};
