import inquirer from "inquirer";

/**
 *
 * @param {Array} addQuestions
 */
const cli = (addQuestions) => (name, apCli, arCli) => {
  inquirer.prompt(addQuestions).then(({ action }) => {
    switch (action) {
      case "p":
        apCli(name, arCli);
        break;
      case "r":
        arCli(name, apCli);
        break;
    }
  });
};

export default cli;
