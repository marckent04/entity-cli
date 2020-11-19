const { init } = require("./store.config");
const { cli } = require("./cli");
const consola = require("consola");
const chalk = require("chalk");

(async () => {
  await init();
  cli();
})();

process.on("exit", () => {
  consola.info(chalk.blueBright("Good code to you"));
});
