import inquirer from "inquirer";
import consola from "consola"
import { entityCreationQuestions } from "./questions.mjs";
import EntityManager from "../EntityManager.mjs";
import { fileExists } from "../../common/common.mjs";
import addCli from "./add.mjs";
import arCli from "./addRelation.mjs";
import apCli from "./addProperty.mjs";

const cli = async () =>
  inquirer.prompt(entityCreationQuestions()).then(async ({name}) => {
       if (!fileExists(name)) {
           const { stderr, stdout } = await EntityManager.create(name);
           EntityManager.init(name);
           if (stderr) throw stderr;
           consola.success(stdout);
       } else {
           consola.info(`update ${name}`);
       }
       addCli(name, apCli, arCli);

  });

export default cli;
