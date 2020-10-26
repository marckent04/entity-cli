import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const rootDir = path.join(__dirname, "..", "..", "..", "..", "..");
// const defaultDir = "."
// export const rootDir = path.join(__dirname, "..", "..", "..");
export const defaultDirectory = path.join(rootDir, "src", "entities");

export const fileExists = (name) => {
  const dest = path.join(defaultDirectory, `${name}.entity.ts`);
  if (fs.existsSync(dest)) return true;
  return false;
};
