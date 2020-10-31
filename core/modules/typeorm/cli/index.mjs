import capitalize from "lodash.capitalize";
import inquirer from "inquirer";

import { entityCreationQuestions } from "./questions.mjs";
import EntityManager from "../EntityManager.mjs";
import { fileExists } from "../../common/common.mjs";
import addCli from "./add.mjs";
import arCli from "./addRelation.mjs";
import apCli from "./addProperty.mjs";

const cli = async () =>
  inquirer.prompt(entityCreationQuestions()).then(async (answers) => {
    const { name } = answers;
    if (!fileExists(capitalize(name))) {
      const { stderr, stdout } = await EntityManager.create(name);
      EntityManager.init(name);
      if (stderr) throw stderr;
      console.log(stdout);
    } else {
      console.log(`update ${name}`);
    }

    addCli(name, apCli, arCli);
  });

export default cli;
