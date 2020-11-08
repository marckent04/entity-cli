const EntityManager = require("../../core/modules/typeorm/EntityManager");
const { templateTs } = require("../results/typeOrm");
// const { string } = require("../../core/modules/typeorm/makers/property");
test("Generate base template", () => {
  const expectedResult = templateTs.split("\n").map((line) => line.trim());

  const done = EntityManager.init("test")
    .split("\n")
    .map((line) => line.trim());

  expect(expectedResult).toStrictEqual(done);
});

// test("append content", () => {});
