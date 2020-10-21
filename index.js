const { getConfigFile } = require("./core/modules/common/configFile");
const typeOrmCli = require("./core/modules/cli/typeorm");
const mongooseCli = require("./core/modules/cli/mongoose");

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
