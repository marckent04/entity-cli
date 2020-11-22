const { addQuestions } = require("./questions");
const inquirer = require("inquirer");

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

module.exports = cli;
