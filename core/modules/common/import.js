const capitalize = require("lodash.capitalize");

const { entityDestructuring } = require("./entity");

const addOrmImport = (ormImport) => (entityContent, toImport) => {
  if (Array.isArray(toImport)) {
    toImport = toImport.map((imp) => `${imp},`);
  } else {
    toImport = [`${toImport},`];
  }

  const regex = new RegExp(`(("|')${ormImport}("|');?)$`);
  // console.log(entityContent);
  const index = entityContent.findIndex((line) => regex.test(line));
  if (index > -1) {
    if (index > 1) {
      toImport.forEach((imp) => entityContent.splice(index, 0, imp));
    } else throw "const.js ligne 20 ";
  }

  return entityContent.map((elt) => elt.trim());
};

const formalizeImports = (currentImports, newImports) => {
  const setImports = new Set([
    ...currentImports.map((elt) => elt.trim()),
    ...newImports,
  ]);
  return Array.from(setImports);
};

const addEntityImport = (
  entityContent,
  entityToImport,
  breakpoint,
  entityToImportPath
) => {
  let { imports, body } = entityDestructuring(entityContent, breakpoint);
  imports = [
    ...imports,
    `import { ${capitalize(entityToImport)} } from "${entityToImportPath}"`,
    "",
  ];

  return [...imports, ...body];
};

module.exports = {
  addEntityImport,
  addOrmImport,
};
