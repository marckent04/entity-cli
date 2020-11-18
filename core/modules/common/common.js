const fs = require("fs");
const path = require("path");
const { getEntitiesLocation, getModuleMode } = require("./configFile");

const fileExists = async (name) => {
  const dest = path.join(await getEntitiesLocation(), `${name}.entity.ts`);
  return fs.existsSync(dest);
};

module.exports = {
  fileExists,
};
