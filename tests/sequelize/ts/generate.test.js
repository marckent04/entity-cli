import { templateTs } from "../results";
import EntityManager from "../../../core/modules/sequelize/EntityManager";
// test("generate Js", () => {});

test("generate ts", () => {
  const expectedResult = templateTs.split("\n").map((line) => line.trim());

  const done = EntityManager.init("cat")
    .split("\n")
    .map((line) => line.trim());

  expect(expectedResult).toStrictEqual(done);
});

// test("add property Js", () => {});

// test("add property Ts", () => {});

// test("add relation Js", () => {});

// test("add relation Ts", () => {});
