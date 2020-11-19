const storage = require("node-persist");
const consola = require("consola");
const chalk = require("chalk");
const path = require("path");

const { inquirer } = require("./index");
const { getEntity } = require("../index");
const { createPath } = require("../common");
const { entityCreationQuestions } = require("./questions");
const { fileExists } = require("../../common/common");

const addPropertyConstructor = ({
  entityManager,
  makerProperty,
  addCli,
  questions,
}) => (entityName, arCli) =>
  inquirer.prompt(questions(entityName)).then(async (answers) => {
    try {
      const { name, type, add, required } = answers;
      entityManager.append(
        entityName,
        makerProperty[type](name, required).join("\n")
      );
      consola.success(chalk.green(`the ${name} column has been created `));
      if (add) addCli(entityName, cli, arCli);
      else consola.info(chalk.blueBright("Good code to you"));
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
              path.relative(currentEntityPath.folder, targetEntityPath.file)
            )
          );
          break;
        case "otm":
          result = await relationsMaker.otm(
            await getEntity(currentEntityPath.file),
            await getEntity(targetEntityPath.file),
            entityName,
            entity,
            path.relative(currentEntityPath.folder, targetEntityPath.file),
            path.relative(targetEntityPath.folder, currentEntityPath.file)
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
            path.relative(targetEntityPath.folder, currentEntityPath.file),
            path.relative(currentEntityPath.folder, targetEntityPath.file)
          );

          await entityManager.update(currentEntityPath.file, result.many);
          await entityManager.update(targetEntityPath.file, result.one);

          break;
        default:
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
        consola.info(`update ${name}`);
      }

      addCli(name, addPropertyCli, addRelationCli);
    });

module.exports = {
  addPropertyConstructor,
  addRelationConstructor,
  baseCliConstructor,
};
