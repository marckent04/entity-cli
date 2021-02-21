const fs = require("fs");
const path = require("path");
const { getEntitiesLocation, getFileExtension } = require("./configFile");
const camelcase = require("camelcase");

const fileExists = async (name, module = null) => {
  const dest = path.join(
    await getEntitiesLocation(module),
    `${name}.entity.ts`
  );
  return fs.existsSync(dest);
};

const canBeInit = async (name, module = null) => {
  const dest = path.join(
    await getEntitiesLocation(module),
    `${name}.entity.ts`
  );
  const baseContent = `export class ${camelCase(name)} {}\n`;

  const content = fs.readFileSync(dest, { encoding: "utf8" });

  return baseContent == content || content == "";
};

const createPath = async (entityName, module = null) => {
  const folder = path.join(await getEntitiesLocation(module));

  return {
    file: path.join(folder, `${entityName}.entity.${getFileExtension()}`),
    folder,
  };
};

const camelCase = (input) =>
  camelcase(input, { pascalCase: true, preserveConsecutiveUppercase: true });

module.exports = {
  fileExists,
  createPath,
  canBeInit,
  camelCase,
};
