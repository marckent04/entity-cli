const {mongoose} = require("../../common/destructuringBreakpoints.mjs"
export { entityCreationQuestions } = require("../../common/cli/questions.mjs";
const {validateProperty} = require("../../common/cli/questions.mjs"
export const addPropertyQuestions = (entityName) => {
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
