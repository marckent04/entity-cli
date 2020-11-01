const fs = require("fs";
const path = require("path";
const {getSrcPathFormConfigFile, getModuleMode } = require("./configFile.mjs"
const capitalize = require("lodash.capitalize";


export const fileExists = (name) => {
  let dest = path.join(getSrcPathFormConfigFile(), `${capitalize((name))}.entity.ts`);
  if (getModuleMode())
    dest = path.join(getSrcPathFormConfigFile(), name, `${capitalize((name))}.entity.ts`);

  return fs.existsSync(dest);
};
