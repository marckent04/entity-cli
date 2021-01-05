const capitalize = require("lodash.capitalize");
const propertyMaker = require("./property");
class Maker extends propertyMaker {
  static hasMany(entity) {
    const modelType = "[any]";
    return {
      entity: `
        ${entity}s: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: '${capitalize(entity)}',
          },
        ]`,
      model: `${entity}s: ${modelType}`,
    };
  }

  static hasOne(entity) {
    const modelType = this.typeHandler("mongoose.Schema.Types.ObjectId");

    return {
      entity: `
        ${entity}: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: '${capitalize(entity)}',
        }
      `,
      model: `${entity}: any`,
    };
  }
}

module.exports = Maker;
