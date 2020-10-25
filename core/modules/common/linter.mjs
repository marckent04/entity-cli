import prettier from "prettier";

const config = {
  semi: false,
  parser: "typescript",
  trailingComma: "all",
};

export const linter = (content) => {
  if (Array.isArray(content)) content = content.join("\n");
  return prettier.format(content, config);
};
