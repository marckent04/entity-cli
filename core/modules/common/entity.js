const fs = require("fs";
const path = require("path";
const capitalize = require("lodash.capitalize";
const { getSrcPathFormConfigFile, getModuleMode } = require("./configFile.mjs";
const {getFileExtension} = require("./configFile.mjs";

const directory = getSrcPathFormConfigFile();

const fileExtension = getFileExtension()
export const filterEntities = (files) => {
  return files
    .map((file) => {
      if (file.split(".")[1] === "entity") return file.split(".")[0];
    })
    .filter((file) => file !== undefined);
};

export const getEntity = (name) => {
  const mod = getModuleMode() ? name : "."
  return fs
    .readFileSync(path.join(directory, mod ,`${capitalize(name)}.entity.${fileExtension}`))
    .toString()
    .split("\n");
};

export const updateEntity = (name, content) => {};

export const existingEntities = (currentEntity) => {
  return filterEntities(
    fs
      .readdirSync(directory)
      .filter((entity) => entity !== `${capitalize(currentEntity)}.entity.${fileExtension}`)
  );
};

export const entityDestructuring = (entityContent, breakpoint) => {
  const regex = new RegExp(breakpoint);

  const seprator = entityContent.findIndex((line) => regex.test(line));

  return {
    consts: entityContent.slice(0, seprator).filter((line) => line != ""),
    body: entityContent.slice(seprator),
  };
};

export const entityPropertyExists = (entityContent, breakpoint, property) => {
  const test = new RegExp(`${property}:`);
  const { body } = entityDestructuring(entityContent, breakpoint);
  return body.find((line) => test.test(line));
};
