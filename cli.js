const boxen = require("boxen");
const chalk = require("chalk");

const packageInfos = require("./package.json");

const { getConfigFile } = require("entity-cli.core/configFile");
const typeOrmCli = require("entity-cli.core/typeorm/cli/index");
const mongooseCli = require("entity-cli.core/mongoose/cli/index");
const sequelizeCli = require("entity-cli.core/sequelize/cli/index");

const cli = () => {
  const config = getConfigFile();

  const version = packageInfos.version;
  const orm = config && config.orm ? config.orm : "typeorm";
  const language = config && config.lang ? config.lang : "Ts";
  // const mode = config && config.mode ? config.mode : "simple";
  // const src = config && config.src ? config.mode : "simple";

  // const destination = getRelativePathFormConfigFile();

  const sms = [
    `${chalk.bold.blue("Entity CLI")} @ v${version}`,
    "",
    `${chalk.blueBright("selected ORM")}: ${orm}`,
    "",
    `${chalk.blueBright("selected language")}: ${language}`,
  ];

  console.log(
    boxen(sms.join("\n"), {
      padding: 1,
      margin: 1,
      borderStyle: "double",
      borderColor: "greenBright",
    }),
  );

  if (config && config.orm) {
    switch (config.orm) {
      case "sequelize":
        sequelizeCli();
        break;
      case "mongoose":
        mongooseCli();
        break;
      default:
        typeOrmCli();
        break;
    }
  } else {
    typeOrmCli();
  }
};

module.exports = {
  cli,
};
