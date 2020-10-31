import { getConfigFile } from "./core/modules/common/configFile.mjs";
import typeOrmCli from "./core/modules/cli/typeorm/index.mjs";
import mongooseCli from "./core/modules/cli/mongoose/index.mjs";
import boxen from "boxen";
import chalk from "chalk";

export const cli = () => {
  const config = getConfigFile();

  const version = "1.0.14";
  const orm = config && config.orm ? config.orm : "typeorm";
  const language = config && config.lang ? config.lang : "Ts";

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
        console.log("sequelize Soon");
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
