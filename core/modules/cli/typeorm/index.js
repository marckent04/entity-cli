import capitalize from "lodash.capitalize";
import inquirer from "inquirer";

import { entityCreationQuestions } from "./questions";
import EntityManager from "../../entity-manager/TypeOrm";
import { fileExists } from "../../common/common";
import addCli from "./add";
import arCli from "./addRelation";
import apCli from "./addProperty";

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
