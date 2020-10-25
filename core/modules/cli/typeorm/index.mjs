import capitalize from "lodash.capitalize";
import inquirer from "inquirer";

import { entityCreationQuestions } from "./questions.js";
import EntityManager from "../../entity-manager/TypeOrm.js";
import { fileExists } from "../../common/common.js";
import addCli from "./add.js";
import arCli from "./addRelation.js";
import apCli from "./addProperty.js";

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
