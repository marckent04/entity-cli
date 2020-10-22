import { getConfigFile } from "./core/modules/common/configFile";
import typeOrmCli from "./core/modules/cli/typeorm";
import mongooseCli from "./core/modules/cli/mongoose";

const config = getConfigFile();

console.log("Hi, welcome to entity manager");
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
