import { validateVariableName } from "../common/questions";
import { mongoose } from "../../common/destructuringBreakpoints";
import { entityPropertyExists } from "../../common/entity";
import { getEntity } from "../../common";
export { entityCreationQuestions } from "../common/questions";

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
