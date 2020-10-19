const { getConfigFile } = require("./core/modules/common/configFile");
const typeOrmCli = require("./core/modules/cli/typeorm");

const config = getConfigFile();

console.log("Hi, welcome to entity manager");
if (config && config.orm) {
  switch (config.orm) {
    case "sequelize":
      console.log("sequelize Soon");
      break;
    case "mongoose":
      console.log("mongoose Soon");
      break;
    default:
      typeOrmCli();
      break;
  }
} else {
  typeOrmCli();
}
