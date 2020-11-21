const { mongoose } = require("../../common/destructuringBreakpoints");
const { entityCreationQuestions } = require("../../common/cli/questions");
const {
  addPropertyQuestions: addPropertyConstructor,
} = require("../../common/cli/questions");

const typeChoices = [
  "String",
  "Number",
  "Boolean",
  "Date",
  "ObjectId",
  "Buffer",
];

const addPropertyQuestions = addPropertyConstructor(mongoose, typeChoices);

const addRelationQuestions = (entity) => {
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
      choices: ["ref"],
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

module.exports = {
  entityCreationQuestions,
  addPropertyQuestions,
};
