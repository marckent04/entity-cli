const fs = require("fs");
const path = require("path");
const { getEntitiesLocation } = require("./configFile");
const {} = require("./constants");

const fileExists = async (name) => {
  const dest = path.join(await getEntitiesLocation(), `${name}.entity.ts`);
  return fs.existsSync(dest);
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
};
