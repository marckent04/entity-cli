const {
  addQuestions,
  addRelationQuestions: addRelationsConstructor,
  entityCreationQuestions,
  addPropertyQuestions: addPropertyConstructor,
} = require("../common/questions");
const { typeORM } = require("../../common/destructuringBreakpoints");

const typeChoices = ["string", "number", "boolean", "Date", "text"];

const relationsChoices = [
  { value: "oto", name: "One-to-one" },
  { value: "otm", name: "One-to-many" },
  { value: "mto", name: "Many-to-one" },
  { value: "mtm", name: "Many-to-many" },
];

const addRelationQuestions = addRelationsConstructor(relationsChoices);
const addPropertyQuestions = addPropertyConstructor(typeORM, typeChoices);

module.exports = {
  addPropertyQuestions,
  entityCreationQuestions,
  addQuestions,
  addRelationQuestions,
};
