const prettier = require("prettier");

const config = {
  semi: false,
  parser: "typescript",
  trailingComma: "all",
};

const linter = (content) => {
  if (Array.isArray(content)) content = content.join("\n");
  return prettier.format(content, config);
};

module.exports = {
  linter
}