const fs = require("fs");
const path = require("path");
const { getEntitiesLocation } = require("./configFile");
const capitalize = require("lodash.capitalize");

const fileExists = async (name, module = null) => {
  const dest = path.join(
    await getEntitiesLocation(module),
    `${name}.entity.ts`
  );
  return fs.existsSync(dest);
};

const canBeInit = async (name) => {
  const dest = path.join(
    await getEntitiesLocation(module),
    `${name}.entity.ts`
  );
  const baseContent = `export class ${capitalize(name)} {}\n`;

  const content = fs.readFileSync(dest, { encoding: "utf8" });

  return baseContent == content;
};

const createPath = async (entityName, module = null) => {
  const folder = path.join(await getEntitiesLocation(module));

  return {
    file: path.join(folder, `${entityName}.entity.ts`),
    folder,
  };
};
module.exports = {
  fileExists,
  createPath,
  canBeInit,
};
