import { addQuestions } from "./questions.js";
import inquirer from "inquirer";

/**
 *
 * @param {*} name nom entite
 * @param {*} apCli add property cli
 * @param {*} arCli add relation cli
 */
function cli(name, apCli, arCli) {
  inquirer.prompt(addQuestions()).then(({ action }) => {
    switch (action) {
      case "p":
        apCli(name, arCli);
        break;
      case "r":
        arCli(name, apCli);
        break;
    }
  });
}

export default cli;
