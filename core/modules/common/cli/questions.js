const storage = require("node-persist");

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

const entityCreationQuestions = async () => {
  let questions = [
    {
      type: "autocomplete",
      name: "name",
      message: "Entity name",
      validate: validateVariableName,
      source: async (previous, input) => {
        const { module } = previous;
        const regex = new RegExp(input, "gi");
        const entities = await existingEntities(module, module, true);
        console.log(entities);
        return [];
        // return existingEntities(module, module, true).filter((entity) =>
        //   entity.match(regex)
        // );
      },
    },
  ];
  if (getModuleMode()) {
    questions.unshift({
      type: "list",
      name: "module",
      message: "Choose one module",
      choices: getModules(),
    });
  }

  return questions;
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
  const moduleQuestion = {
    type: "autocomplete",
    name: "module",
    message: "Choose a module",
    source: function (_, input) {
      const regex = new RegExp(input, "gi");
      return getRelationModules(entity).filter((module) => module.match(regex));
    },
    validate: async ({ value }) => {
      await storage.setItem("targetModule", value);
      return true;
    },
  };
  const questions = [
    {
      type: "autocomplete",
      name: "entity",
      message: "Choose the entity",
      source: async (previous, _) => {
        const { module } = previous;
        const entities = await existingEntities(entity, module);
        return entities;
      },
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

  if (getModuleMode()) {
    questions.unshift(moduleQuestion);
  }

  return questions;
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
