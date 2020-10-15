const { addQuestions } = require("./questions");
const inquirer = require("inquirer");

/**
 *
 * @param {*} name nom entite
 * @param {*} apCli add property cli
 * @param {*} arCli add relation cli
 */
function cli(name, apCli, arCli) {
  inquirer.prompt(addQuestions).then(({ action }) => {
    switch (action) {
      case "p":
        apCli(name);
        break;
      case "r":
        arCli(name);
        break;
    }
  });
}

module.exports = cli;
