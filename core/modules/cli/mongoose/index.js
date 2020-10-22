import capitalize from "lodash.capitalize";
import inquirer from "inquirer";

import { entityCreationQuestions } from "./questions";
import EntityManager from "../../entity-manager/Mongoose";
import { fileExists } from "../../common/common";
import apCli from "./addProperty";

const cli = async () =>
  inquirer.prompt(entityCreationQuestions()).then(async (answers) => {
    const { name } = answers;
    if (!fileExists(capitalize(name))) {
      EntityManager.create(name);
      console.log("entity created");
    } else {
      console.log(`update ${name}`);
    }

    apCli(name);
  });

export default cli;
