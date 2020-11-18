const { init } = require("./store.config");
const { cli } = require("./cli");

(async () => {
  await init();
  cli();
})();

process.on("exit", () => {
  console.log("good code");
});
