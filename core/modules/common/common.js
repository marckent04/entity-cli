const fs = require("fs");
const path = require("path");

// const rootDir = path.join(__dirname, "..", "..", "..", "..", "..");
// const defaultDir = "."
const rootDir = path.join(__dirname, "..", "..", "..");
const defaultDirectory = path.join(rootDir, "src", "entities");

const fileExists = (name) => {
  const dest = path.join(defaultDirectory, `${name}.entity.ts`);
  if (fs.existsSync(dest)) return true;
  return false;
};

module.exports = {
  defaultDirectory,
  fileExists,
  rootDir,
};
