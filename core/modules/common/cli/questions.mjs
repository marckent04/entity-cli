import {
  existingEntities,
} from "../index.mjs";
import { entityPropertyExists } from "../../common/entity.mjs";
import { getEntity } from "../entity.mjs";
import {getModules} from "../features/module-mode.mjs"
import {getModuleMode} from "../configFile.mjs"

export const validateVariableName = (value) => {
  if (!isNaN(value[0]) || value.split(" ").length > 1) return false;
  return true;
};

const validateProperty  = (propertyName, entityName, breakpoint) => {
  const validName = validateVariableName(propertyName)

  if (validName) {
    const propertyExists = entityPropertyExists(getEntity(entityName), breakpoint, propertyName)
    if (propertyExists) {
      return "Propriété existe deja"
    }
  } else {
    return "Entrer un nom valide"
  }

  return true
}

export const entityCreationQuestions = () => {
  if (getModuleMode()) {
    return [
      {
        type: "list",
        name: "name",
        message: "Choose one module",
        choices: getModules(),
      },
    ]
  }
  return [
    {
      type: "input",
      name: "name",
      message: "Entity name",
      validate: validateVariableName,
    },
  ];
}

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

export const addRelationQuestions = (relationsChoices) => (entity) => {
  const moduleMode =  getModuleMode()
  return [
    {
      type: "list",
      name: "entity",
      message: moduleMode ? "Choose a module" : "Choose the entity",
      choices: moduleMode ? getModules() : existingEntities(entity),
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
  ]
};

export const addPropertyQuestions = (breakpoint, typeChoices) => (
  entityName
) => [
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
