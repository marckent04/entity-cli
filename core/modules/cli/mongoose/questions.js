const {
  addRelationQuestions: addRelationsConstructor,
  entityCreationQuestions,
  addPropertyQuestions: addPropertyConstructor,
} = require("../common/questions");

const { validateVariableName } = require("../common/questions");
const { mongoose } = require("../../common/destructuringBreakpoints");

const typeChoices = ["String", "Number", "Boolean", "Date"];

const addPropertyQuestions = (entityName) => [
  {
    type: "input",
    name: "name",
    message: "property name",
    validate: function (val) {
      return validateVariableName(val);
    },
  },
  {
    type: "list",
    name: "type",
    message: "choose property type",
    choices: typeChoices,
    filter: function (val) {
      return val.toLowerCase();
    },
  },
  {
    type: "confirm",
    name: "add",
    message: "Add new property ?",
    default: false,
  },
];
module.exports = {
  addPropertyQuestions,
  entityCreationQuestions,
};
