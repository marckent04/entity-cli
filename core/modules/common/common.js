const fs = require("fs");
const path = require("path");

const directory = path.join(__dirname, "..", "..", "..", "src", "entities");

const fileExists = (name) => {
  const dest = path.join(directory, `${name}.entity.ts`);
  if (fs.existsSync(dest)) return true;
  return false;
};

module.exports = {
  directory,
  fileExists,
};
