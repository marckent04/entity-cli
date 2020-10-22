const { getConfigFile } = require("./core/modules/common/configFile");
const typeOrmCli = require("./core/modules/cli/typeorm");
const mongooseCli = require("./core/modules/cli/mongoose");

const config = getConfigFile();

console.log("Hi, welcome to entity manager");
if (config) {
  console.log("ORM selected: " + config.orm ?? "typeORM");
  console.log("language selected: " + config.language ?? "Ts");
} else {
  console.log("ORM selected: typeORM");
  console.log("language selected: Ts");
}

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
