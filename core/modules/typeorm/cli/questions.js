const {
  addRelationQuestions : addRelationsConstructor,
  addPropertyQuestions : addPropertyConstructor,
} = require("../../common/cli/questions");
const { typeORM } = require("../../common/destructuringBreakpoints");

export const { addQuestions, entityCreationQuestions } = require("../../common/cli/questions");

const typeChoices = ["string", "number", "boolean", "Date", "text"];

const relationsChoices = [
  { value: "oto", name: "One-to-one" },
  { value: "otm", name: "One-to-many" },
  { value: "mto", name: "Many-to-one" },
  { value: "mtm", name: "Many-to-many" },
];

export const addRelationQuestions = addRelationsConstructor(relationsChoices);
export const addPropertyQuestions = addPropertyConstructor(
  typeORM,
  typeChoices
);
