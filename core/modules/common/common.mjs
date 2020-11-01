import fs from "fs";
import path from "path";
import {getSrcPathFormConfigFile, getModuleMode } from "./configFile.mjs"
import capitalize from "lodash.capitalize";


export const fileExists = (name) => {
  let dest = path.join(getSrcPathFormConfigFile(), `${capitalize((name))}.entity.ts`);
  if (getModuleMode())
    dest = path.join(getSrcPathFormConfigFile(), name, `${capitalize((name))}.entity.ts`);

  return fs.existsSync(dest);
};
