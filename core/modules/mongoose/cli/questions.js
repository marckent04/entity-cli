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

module.exports = {
  entityCreationQuestions,
  addPropertyQuestions,
};
