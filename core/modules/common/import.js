const capitalize = require("lodash.capitalize")

const { entityDestructuring } = require("./entity");
const { getModuleMode } = require("./configFile");

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
    else throw "const.js ligne 20 ";
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
// const deleteTypeOrmImport = (imp) => {};
// const existsEntityImport = (entity) => {};


const addEntityImport = (entityContent, entityToImport, breakpoint) => {
  let { imports, body } = entityDestructuring(entityContent, breakpoint);
  let src = `./${capitalize(entityToImport)}.entity`
  if (getModuleMode())
    src = `../${entityToImport}/${capitalize(entityToImport)}.entity`

  imports = [
    ...imports,
    `import { ${capitalize(entityToImport)} } from "./${capitalize(entityToImport)}.entity"`,
    "",
  ];


  return [...imports, ...body];
};



module.exports = {
  addTypeOrmImport,
  addEntityImport
}