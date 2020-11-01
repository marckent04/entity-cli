import capitalize from "lodash.capitalize"

import { entityDestructuring } from "./entity.mjs";
import { getModuleMode } from "./configFile.mjs";
import consola from "consola"

export const addTypeOrmImport = (entityContent, toImport) => {
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

// const deleteTypeOrmImport = (imp) => {};

export const addEntityImport = (entityContent, entityToImport, breakpoint) => {
  let { imports, body } = entityDestructuring(entityContent, breakpoint);
  let src = `./${capitalize(entityToImport)}.entity`
  if (getModuleMode())
    src = `../${entityToImport}/${capitalize(entityToImport)}.entity`

  imports = [
    ...imports,
    `import { ${capitalize(entityToImport)} } from "${src}";`,
    "",
  ];


  return [...imports, ...body];
};

// const existsEntityImport = (entity) => {};
