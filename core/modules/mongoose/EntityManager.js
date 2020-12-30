const BaseEntityManager = require("../common/BaseEntity");
const { linter } = require("../common/linter");

class MongooseManager extends BaseEntityManager {
  static init(name) {
    return linter(this.template(name));
  }

  static templateJs(name) {
    return `
      import * as mongoose from 'mongoose'
      
      export const ${name} = new mongoose.Schema({
        updatedAt: { type: Date, default: Date.now },
       createdAt: { type: Date, default: Date.now }
      })
    `;
  }

  static templateTs(name) {
    return `
      import * as mongoose from 'mongoose'
      
      export interface ${name}Interface extends mongoose.Document {
        updatedAt: Date;
        createdAt: Date;
      }

      export const ${name} = new mongoose.Schema({
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now }
      })
    `;
  }

  static append(nameOrContent, newContent) {
    super.append(nameOrContent, newContent, "}\\)");
  }
}

module.exports = MongooseManager;
