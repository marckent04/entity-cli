const { getConfigFile } = require("./core/modules/common/configFile");
const typeOrmCli = require("./core/modules/typeorm/cli/index");
const mongooseCli = require("./core/modules/mongoose/cli/index");
const sequelizeCli = require("./core/modules/sequelize/cli/index");
const boxen = require("boxen");
const chalk = require("chalk");

const cli = () => {
  const config = getConfigFile();

  const version = "1.1.8";
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
    })
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
