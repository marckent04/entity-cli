import fs from "fs";
import path from "path";

export const rootDir = path.join(__dirname, "..", "..", "..", "..", "..");
// const defaultDir = "."
// export const rootDir = path.join(__dirname, "..", "..", "..");
export const defaultDirectory = path.join(rootDir, "src", "entities");

export const fileExists = (name) => {
  const dest = path.join(defaultDirectory, `${name}.entity.ts`);
  if (fs.existsSync(dest)) return true;
  return false;
};
