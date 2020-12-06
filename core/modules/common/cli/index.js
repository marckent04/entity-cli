const inquirer = require("inquirer");

inquirer.registerPrompt(
  "autocomplete",
  require("inquirer-autocomplete-prompt")
);

exports.inquirer = inquirer;
