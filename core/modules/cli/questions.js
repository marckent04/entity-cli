const {
  entityExistsFromConfigFile: fileExists,
} = require("../common/configFile");
const {
  existingEntities,
  entityPropertyExists,
  getEntity,
} = require("../common/index");

const validateVariable = function (value) {
  if (!isNaN(value[0])) return "Entrer un nom valide";
  return true;
};

const addPropertyQuestions = (entityName) => {
  // console.log(entityPropertyExists(getEntity(entityName), "updateDate"));
  return [
    {
      type: "input",
      name: "name",
      message: "property name",
      validate: function (val) {
        const validVar = validateVariable(val);
        if (validVar) return entityPropertyExists(getEntity(entityName), val);

        return "enter an valid name";
      },
    },
    {
      type: "list",
      name: "type",
      message: "choose property type",
      choices: ["string", "number", "boolean", "Date", "text"],
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
};

const entityCreationQuestions = [
  {
    type: "input",
    name: "name",
    message: "Entity name",
    validate: (val) => {
      return validateVariable(val);
    },
  },
];

const entityUpdateQuestions = [];

const addQuestions = [
  {
    type: "list",
    name: "action",
    message: "What for next ?",
    choices: [
      { name: "Ajouter propriété", value: "p" },
      { name: "Ajouter relation", value: "r" },
    ],
  },
];

const addRelationQuestions = (entity) => [
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
    choices: [
      { value: "oto", name: "One-to-one" },
      { value: "otm", name: "One-to-many" },
      { value: "mto", name: "Many-to-one" },
      { value: "mtm", name: "Many-to-many" },
    ],
  },
  {
    type: "confirm",
    name: "add",
    message: "Add new property",
    default: false,
  },
];

module.exports = {
  addPropertyQuestions,
  entityCreationQuestions,
  addQuestions,
  addRelationQuestions,
};
