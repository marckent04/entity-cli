import {
  addRelationQuestions as addRelationsConstructor,
  addPropertyQuestions as addPropertyConstructor,
} from "../common/questions";
import { typeORM } from "../../common/destructuringBreakpoints";

export { addQuestions, entityCreationQuestions } from "../common/questions";

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
