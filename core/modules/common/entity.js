const fs = require("fs");
const path = require("path");
const capitalize = require("lodash.capitalize");

const { getDirectoryFromConfigFile } = require("./configFile");

const directory = getDirectoryFromConfigFile();

const filterEntities = (files) => {
  return files
    .map((file) => {
      if (file.split(".")[1] == "entity") return file.split(".")[0];
    })
    .filter((file) => file != undefined);
};

const getEntity = (name) => {
  return fs
    .readFileSync(path.join(directory, `${name}.entity.ts`))
    .toString()
    .split("\n");
};

const updateEntity = (name, content) => {};

const existingEntities = (currentEntity) => {
  return filterEntities(
    fs
      .readdirSync(directory)
      .filter((entity) => entity != `${capitalize(currentEntity)}.entity.ts`)
  );
};

const entityDestructuring = (entityContent, breakpoint) => {
  const regex = new RegExp(breakpoint);

  const seprator = entityContent.findIndex((line) => regex.test(line));

  return {
    imports: entityContent.slice(0, seprator).filter((line) => line != ""),
    body: entityContent.slice(seprator),
  };
};

const entityPropertyExists = (entityContent, breakpoint, property) => {
  const test = new RegExp(`${property}:`);
  const { body } = entityDestructuring(entityContent, breakpoint);
  return body.find((line) => test.test(line)) ? "Propriété existe deja" : true;
};

module.exports = {
  filterEntities,
  updateEntity,
  existingEntities,
  getEntity,
  entityDestructuring,
  entityPropertyExists,
};
