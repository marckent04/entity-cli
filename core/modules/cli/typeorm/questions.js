import {
  addRelationQuestions as addRelationsConstructor,
  addPropertyQuestions as addPropertyConstructor,
} from "../common/questions.js";
import { typeORM } from "../../common/destructuringBreakpoints.js";

export { addQuestions, entityCreationQuestions } from "../common/questions.js";

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
