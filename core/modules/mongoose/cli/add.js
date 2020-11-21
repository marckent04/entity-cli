const { addQuestions } = require("./questions");
const inquirer = require("inquirer");

/**
 *
 * @param {*} name nom entite
 * @param {*} apCli add property cli
 * @param {*} arCli add relation cli
 */
function cli(name, apCli, arCli) {
  apCli(name, arCli);
}

module.exports = cli;
