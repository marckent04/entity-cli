import { validateVariableName } from "../../common/cli/questions.mjs";
import { mongoose } from "../../common/destructuringBreakpoints.mjs";
import { entityPropertyExists } from "../../common/entity.mjs";
import { getEntity } from "../../common/index.mjs";
export { entityCreationQuestions } from "../../common/cli/questions.mjs";

export const addPropertyQuestions = (entityName) => {
  const typeChoices = ["String", "Number", "Boolean", "Date"];

  return [
    {
      type: "input",
      name: "name",
      message: "property name",
      validate: validateVariableName
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
