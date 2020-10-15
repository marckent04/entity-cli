const { entityDestructuring } = require("./entity");

const addTypeOrmImport = (entityContent, toImport) => {
  if (Array.isArray(toImport)) {
    toImport = toImport.map((imp) => `${imp},`);
  } else {
    toImport = [`${toImport},`];
  }

  const regex = new RegExp('("typeorm"|"typeorm";)$');
  const index = entityContent.findIndex((line) => regex.test(line));

  if (index > -1) {
    if (index > 1)
      toImport.forEach((imp) => entityContent.splice(index, 0, imp));
    else throw "import.js ligne 20 ";
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

const deleteTypeOrmImport = (imp) => {};

const addEntityImport = (entityContent, entityToImport) => {
  let { imports, body } = entityDestructuring(entityContent);

  imports = [
    ...imports,
    `import { ${entityToImport} } from "./${entityToImport}.entity"`,
    "",
  ];

  return [...imports, ...body];
};

const existsEntityImport = (entity) => {};

module.exports = {
  addTypeOrmImport,
  addEntityImport,
};
