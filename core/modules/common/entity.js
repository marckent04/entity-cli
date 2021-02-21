const fs = require("fs");
const consola = require("consola");
const chalk = require("chalk");

const {
  getSrcPathFormConfigFile,
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

const getEntity = async (path) => {
  // console.log("one: " + name);
  // console.log("two: " + (await getEntitiesLocation()));
  // const mod = getModuleMode() ? name : ".";
  // .readFileSync(path.join(directory, mod, `${name}.entity.${fileExtension}`))
  return fs.readFileSync(path).toString().split("\n");
};

const existingEntities = async (currentEntity, module = null, all = false) => {
  let entities;
  const src = await getEntitiesLocation(module);

  try {
    entities = fs.readdirSync(src);
  } catch (error) {
    consola.error(chalk.red(src + " not found"));
    process.exit();
  }
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
