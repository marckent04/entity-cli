const path = require("path";
const {fileURLToPath} = require("url";

const __dirname = path.dirname(fileURLToPath(const.meta.url));
// export const rootDir = path.join(__dirname, "..", "..", "..", "..", "..");
export const rootDir = path.join(__dirname, "..", "..", "..");
export const defaultDirectory = path.join(rootDir, "src", "entities");
export const relativeDefaultDirectory = path.join("src", "entities");
export const relativeModuleDirectory = path.join("src", "modules")
export const moduleDefaultDirectory = path.join(rootDir, relativeModuleDirectory);
