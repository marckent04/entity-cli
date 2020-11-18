const { inquirer } = require("../../common/cli");
const storage = require("node-persist");
const consola = require("consola");
const chalk = require("chalk");
const path = require("path");
const { addRelationQuestions } = require("./questions");
const { getEntity } = require("../../common/index");
const { createPath } = require("../../common/common");

const relations = require("../makers/relations");
const EntityManager = require("../EntityManager");
const addCli = require("./add");

//entity : entite avec laquelle on etablie la relation (nom variable a cahnger)
const cli = (entityName, apCli) => {
  inquirer.prompt(addRelationQuestions(entityName)).then(async (answers) => {
    const currentModule = await storage.getItem("currentModule");

    const { entity, relation, add, module } = answers;

    const targetEntityPath = await createPath(entity, module);

    const currentEntityPath = await createPath(entityName, currentModule);

    console.log(currentEntityPath, targetEntityPath);
    let result = null;

    try {
      switch (relation) {
        case "oto":
          await EntityManager.update(
            currentEntityPath.file,
            await relations.oto(
              await getEntity(currentEntityPath.file),
              entity,
              path.relative(currentEntityPath.folder, targetEntityPath.file)
            )
          );
          break;
        case "otm":
          result = relations.otm(
            getEntity(currentEntityPath.file),
            getEntity(targetEntityPath.file),
            entityName,
            entity
          );

          await EntityManager.update(currentEntityPath.file, result.one);
          await EntityManager.update(targetEntityPath.file, result.many);
          break;
        case "mto":
          result = relations.otm(
            getEntity(targetEntityPath.file),
            getEntity(currentEntityPath.file),
            entity,
            entityName
          );

          await EntityManager.update(currentEntityPath.file, result.many);
          await EntityManager.update(targetEntityPath.file, result.one);

          break;
        default:
          break;
      }

      consola.success(chalk.green("relation etablie"));
      if (add) addCli(entityName, apCli, cli);
    } catch (error) {
      consola.error(error);
    }
  });
};

module.exports = cli;
