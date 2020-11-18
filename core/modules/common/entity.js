const fs = require("fs");
const path = require("path");
const capitalize = require("lodash.capitalize");
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

const existingEntities = (currentEntity) => {
  return filterEntities(
    fs
      .readdirSync(directory)
      .filter((entity) => entity !== `${currentEntity}.entity.${fileExtension}`)
  );
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
