const { existingEntities } = require("../index");
const { entityPropertyExists } = require("../../common/entity");
const { getEntity } = require("../entity");
const { getModules, getRelationModules } = require("../features/module-mode");
const { getModuleMode } = require("../configFile");

const validateVariableName = (value) => {
  return !(!isNaN(value[0]) || value.split(" ").length > 1);
};

const validateProperty = (propertyName, entityName, breakpoint) => {
  const validName = validateVariableName(propertyName);

  if (validName) {
    const propertyExists = entityPropertyExists(
      getEntity(entityName),
      breakpoint,
      propertyName
    );
    if (propertyExists) {
      return "Propriété existe deja";
    }
  } else {
    return "Entrer un nom valide";
  }

  return true;
};

const entityCreationQuestions = () => {
  if (getModuleMode()) {
    return [
      {
        type: "list",
        name: "name",
        message: "Choose one module",
        choices: getModules(),
      },
    ];
  }
  return [
    {
      type: "input",
      name: "name",
      message: "Entity name",
      validate: validateVariableName,
    },
  ];
};

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

const addRelationQuestions = (relationsChoices) => (entity) => {
  const moduleMode = getModuleMode();
  return [
    {
      type: "list",
      name: "entity",
      message: moduleMode ? "Choose a module" : "Choose the entity",
      choices: moduleMode
        ? getRelationModules(entity)
        : existingEntities(entity),
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
};

const addPropertyQuestions = (breakpoint, typeChoices) => (entityName) => [
  {
    type: "input",
    name: "name",
    message: "property name",
    validate: (value) => validateProperty(value, entityName, breakpoint),
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
  validateProperty,
  entityCreationQuestions,
  addQuestions,
  addRelationQuestions,
  addPropertyQuestions,
};
