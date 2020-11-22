const capitalize = require("lodash.capitalize");

class Maker {
  static hasMany(entity) {
    return `
    ${entity}s: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: '${capitalize(entity)}',
    },
  ]`;
  }

  static hasOne(entity) {
    return `
    ${entity}: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: '${capitalize(entity)}',
    }
  `;
  }
}

module.exports = Maker;
