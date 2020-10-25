import { validateVariableName } from "../common/questions.js";
import { mongoose } from "../../common/destructuringBreakpoints.js";
import { entityPropertyExists } from "../../common/entity.js";
import { getEntity } from "../../common/index.js";
export { entityCreationQuestions } from "../common/questions.js";

export const addPropertyQuestions = (entityName) => {
  const typeChoices = ["String", "Number", "Boolean", "Date"];

  return [
    {
      type: "input",
      name: "name",
      message: "property name",
      validate: function (val) {
        const validVar = validateVariableName(val);
        if (validVar)
          return entityPropertyExists(getEntity(entityName), mongoose, val);

        return "enter an valid name";
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
};
