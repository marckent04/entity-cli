const {
  entityPropertyExists,
  getEntity,
  existingEntities,
} = require("../../common/index");

const validateVariableName = (value) => {
  if (!isNaN(value[0])) return "Entrer un nom valide";
  return true;
};

const entityCreationQuestions = () => [
  {
    type: "input",
    name: "name",
    message: "Entity name",
    validate: (val) => {
      return validateVariableName(val);
    },
  },
];

const addQuestions = () => [
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

const addRelationQuestions = (relationsChoices) => (entity) => [
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

const addPropertyQuestions = (breakpoint, typeChoices) => (entityName) => [
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

module.exports = {
  entityCreationQuestions,
  addQuestions,
  addRelationQuestions,
  addPropertyQuestions,
  validateVariableName,
};
