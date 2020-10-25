import {
  entityPropertyExists,
  getEntity,
  existingEntities,
} from "../../common/index.js";

export const validateVariableName = (value) => {
  if (!isNaN(value[0])) return "Entrer un nom valide";
  return true;
};

export const entityCreationQuestions = () => [
  {
    type: "input",
    name: "name",
    message: "Entity name",
    validate: (val) => {
      return validateVariableName(val);
    },
  },
];

export const addQuestions = () => [
  {
    type: "list",
    name: "action",
    message: "What for next ?",
    choices: [
      { name: "Add new property", value: "p" },
      { name: "Add new relationship", value: "r" },
    ],
  },
];

export const addRelationQuestions = (relationsChoices) => (entity) => [
  {
    type: "list",
    name: "entity",
    message: "Choose the entity",
    choices: existingEntities(entity),
  },
  {
    type: "list",
    name: "relation",
    message: "Relationship",
    choices: relationsChoices,
  },
  {
    type: "confirm",
    name: "add",
    message: "Add new property",
    default: false,
  },
];

export const addPropertyQuestions = (breakpoint, typeChoices) => (
  entityName
) => [
  {
    type: "input",
    name: "name",
    message: "property name",
    validate: function (val) {
      const validVar = validateVariableName(val);
      if (validVar)
        return entityPropertyExists(getEntity(entityName), breakpoint, val);

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
    name: "required",
    message: "Mandatory ?",
    default: true,
  },
  {
    type: "confirm",
    name: "add",
    message: "Add new property ?",
    default: false,
  },
];
