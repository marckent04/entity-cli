import fs from "fs";
import path from "path";
import capitalize from "lodash.capitalize";
import { getDirectoryFromConfigFile } from "./configFile.mjs";

const directory = getDirectoryFromConfigFile();

export const filterEntities = (files) => {
  return files
    .map((file) => {
      if (file.split(".")[1] == "entity") return file.split(".")[0];
    })
    .filter((file) => file != undefined);
};

export const getEntity = (name) => {
  return fs
    .readFileSync(path.join(directory, `${name}.entity.ts`))
    .toString()
    .split("\n");
};

export const updateEntity = (name, content) => {};

export const existingEntities = (currentEntity) => {
  return filterEntities(
    fs
      .readdirSync(directory)
      .filter((entity) => entity != `${capitalize(currentEntity)}.entity.ts`)
  );
};

export const entityDestructuring = (entityContent, breakpoint) => {
  const regex = new RegExp(breakpoint);

  const seprator = entityContent.findIndex((line) => regex.test(line));

  return {
    imports: entityContent.slice(0, seprator).filter((line) => line != ""),
    body: entityContent.slice(seprator),
  };
};

export const entityPropertyExists = (entityContent, breakpoint, property) => {
  const test = new RegExp(`${property}:`);
  const { body } = entityDestructuring(entityContent, breakpoint);
  return body.find((line) => test.test(line)) ? "Propriété existe deja" : true;
};
