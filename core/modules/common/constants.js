const path = require("path");

// const rootDir = path.join(__dirname, "..", "..", "..", "..", "..");
const rootDir = path.join(__dirname, "..", "..", "..");

const defaultDirectory = path.join(rootDir, "src", "entities");
const relativeDefaultDirectory = path.join("src", "entities");
const relativeModuleDirectory = path.join("src", "modules");
const moduleDefaultDirectory = path.join(rootDir, relativeModuleDirectory);

module.exports = {
  defaultDirectory,
  relativeDefaultDirectory,
  moduleDefaultDirectory,
  relativeModuleDirectory,
  rootDir,
};
