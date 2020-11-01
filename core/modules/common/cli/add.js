const inquirer = require("inquirer");

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

module.exports = cli;
