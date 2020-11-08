const {
  addRelationQuestions: addRelationsConstructor,
  addPropertyQuestions: addPropertyConstructor,
} = require("../../common/cli/questions");
const { typeORM } = require("../../common/destructuringBreakpoints");

const {
  addQuestions,
  entityCreationQuestions,
} = require("../../common/cli/questions");

const typeChoices = ["String", "Number", "Boolean", "Date"];

const relationsChoices = [
  { value: "oto", name: "One-to-one" },
  { value: "otm", name: "One-to-many" },
  { value: "mto", name: "Many-to-one" },
  { value: "mtm", name: "Many-to-many" },
];

const addRelationQuestions = addRelationsConstructor(relationsChoices);
const addPropertyQuestions = addPropertyConstructor(typeORM, typeChoices);

module.exports = {
  addQuestions,
  entityCreationQuestions,
  addRelationQuestions,
  addPropertyQuestions,
};
