const storage = require("node-persist");
const consola = require("consola");
const chalk = require("chalk");
const path = require("path");

const { inquirer } = require("./index");
const { getEntity } = require("../index");
const { createPath } = require("../common");
const { entityCreationQuestions } = require("./questions");
const { fileExists, canBeInit } = require("../../common/common");

const createImport = (from, to) => {
  const removeExtensionregex = /(.ts|.js)$/i;
  const relativePathRegex = /^\.?\.\//;
  let importPath = path.relative(from, to).replace(removeExtensionregex, "");
  if (!relativePathRegex.test(importPath))
    importPath = ["./", ...importPath].join("");

  return importPath;
};

const addPropertyConstructor = ({
  entityManager,
  makerProperty,
  addCli,
  questions,
}) => (entityName, arCli) =>
  inquirer.prompt(questions(entityName)).then(async (answers) => {
    try {
      const { name, type, add, required } = answers;
      entityManager.append(entityName, makerProperty[type](name, required));
      consola.success(chalk.green(`the ${name} column has been created `));
      if (add)
        addCli(
          entityName,
          addPropertyConstructor({
            entityManager,
            addCli,
            makerProperty,
            questions,
          }),
          arCli
        );
    } catch (error) {
      consola.error(error);
    }
  });

const addRelationConstructor = ({
  entityManager,
  addCli,
  questions,
  relationsMaker,
}) => (entityName, apCli) => {
  inquirer.prompt(questions(entityName)).then(async (answers) => {
    const currentModule = await storage.getItem("currentModule");

    const { entity, relation, add, module } = answers;

    const targetEntityPath = await createPath(entity, module);

    const currentEntityPath = await createPath(entityName, currentModule);

    let result = null;

    try {
      switch (relation) {
        case "oto":
          await entityManager.update(
            currentEntityPath.file,
            await relationsMaker.oto(
              await getEntity(currentEntityPath.file),
              entity,
              createImport(currentEntityPath.folder, targetEntityPath.file)
            )
          );
          break;
        case "otm":
          result = await relationsMaker.otm(
            await getEntity(currentEntityPath.file),
            await getEntity(targetEntityPath.file),
            entityName,
            entity,
            createImport(currentEntityPath.folder, targetEntityPath.file),
            createImport(targetEntityPath.folder, currentEntityPath.file)
          );
          await entityManager.update(currentEntityPath.file, result.one);
          await entityManager.update(targetEntityPath.file, result.many);
          break;
        case "mto":
          result = await relationsMaker.otm(
            await getEntity(targetEntityPath.file),
            await getEntity(currentEntityPath.file),
            entity,
            entityName,
            createImport(targetEntityPath.folder, currentEntityPath.file),
            createImport(currentEntityPath.folder, targetEntityPath.file)
          );

          await entityManager.update(currentEntityPath.file, result.many);
          await entityManager.update(targetEntityPath.file, result.one);

          break;
        default:
          if (relationsMaker[relation]) {
            entityManager.append(entityName, relationsMaker[relation](entity));
          }
          break;
      }

      consola.success(chalk.green("relation etablished"));
      if (add) addCli(entityName, apCli, cli);
    } catch (error) {
      consola.error(error);
    }
  });
};

const baseCliConstructor = ({
  entityManager,
  addPropertyCli,
  addRelationCli,
  addCli,
}) => async () =>
  inquirer
    .prompt(await entityCreationQuestions())
    .then(async ({ name, module }) => {
      const exists = await fileExists(name, module);

      if (module) await storage.updateItem("currentModule", module);

      if (!exists) {
        await entityManager.create(name);
      } else {
        if (await canBeInit(name, module)) {
          await entityManager.create(name);
          consola.info(`entity ${name} initialized`);
        } else {
          consola.info(`update ${name}`);
        }
      }

      addCli(name, addPropertyCli, addRelationCli);
    });

module.exports = {
  addPropertyConstructor,
  addRelationConstructor,
  baseCliConstructor,
};
