const { fileExists } = require("../common/common");
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
      message: "Nom de la propriété",
      validate: function (val) {
        const validVar = validateVariable(val);
        if (validVar) return entityPropertyExists(getEntity(entityName), val);

        return "entrer un nom valide";
      },
    },
    {
      type: "list",
      name: "type",
      message: "Type de la propriété ?",
      choices: ["string", "number", "boolean", "Date", "text"],
      filter: function (val) {
        return val.toLowerCase();
      },
    },
    {
      type: "confirm",
      name: "required",
      message: "champ obligatoire ?",
      default: true,
    },
    {
      type: "confirm",
      name: "add",
      message: "ajouter nouvelle propriété",
      default: false,
    },
  ];
};

const entityCreationQuestions = [
  {
    type: "input",
    name: "name",
    message: "Nom de l'entité",
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
    message: "Prochaine action",
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
    message: "Choisissez une entité",
    choices: existingEntities(entity),
  },
  {
    type: "list",
    name: "relation",
    message: "Type de relation",
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
    message: "ajouter nouvelle propriété",
    default: false,
  },
];

module.exports = {
  addPropertyQuestions,
  entityCreationQuestions,
  addQuestions,
  addRelationQuestions,
};
