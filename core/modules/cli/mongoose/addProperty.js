import inquirer from "inquirer";

import { addPropertyQuestions } from "./questions";
import MakeProperty from "../../make/mongoose/property";
import EntityManager from "../../entity-manager/Mongoose";

const cli = (entityName) =>
  inquirer.prompt(addPropertyQuestions(entityName)).then((answers) => {
    try {
      const { name, type, add } = answers;
      EntityManager.append(entityName, MakeProperty[type.toLowerCase()](name));

      if (add) cli(entityName);
      else console.log("Good code to you");
    } catch (error) {
      console.log(error);
    }
    // if (answers.add) return addNewProperty(entityName)
  });

export default cli;
