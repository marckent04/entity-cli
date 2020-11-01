const {mongoose} = require("../../common/destructuringBreakpoints");
const { entityCreationQuestions } = require("../../common/cli/questions");
const {validateProperty} = require("../../common/cli/questions");

const addPropertyQuestions = (entityName) => {
  const typeChoices = ["String", "Number", "Boolean", "Date"];

  return [
    {
      type: "input",
      name: "name",
      message: "property name",
      validate: (value) => validateProperty(value, entityName, mongoose),

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
};

module.exports = {
  entityCreationQuestions,
  addPropertyQuestions
}