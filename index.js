import { getConfigFile } from "./core/modules/common/configFile";
import typeOrmCli from "./core/modules/cli/typeorm";
import mongooseCli from "./core/modules/cli/mongoose";
import boxen from "boxen";
import chalk from "chalk";
import consola from "consola";

const config = getConfigFile();

const version = process.env.npm_package_version;
const orm = config.orm || "typeorm";
const language = config.language || "Ts";

const sms = [
  `${chalk.bold.blue("Entity CLI")} @ v${version}`,
  "",
  `${chalk.blueBright("selected ORM")}: ${orm}`,
  "",
  `${chalk.blueBright("selected language")}: ${language}`,
];
const presentationSMS = `
  
`;

console.log(
  boxen(sms.join("\n"), {
    padding: 1,
    margin: 1,
    borderStyle: "double",
    borderColor: "greenBright",
  })
);

// if (config) {
//   console.log("ORM selected: " + config.orm ?? "typeORM");
//   console.log("language selected: " + config.language ?? "Ts");
// } else {
//   console.log("ORM selected: typeORM");
//   console.log("language selected: Ts");
// }

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
