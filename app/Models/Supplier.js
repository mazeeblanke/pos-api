'use strict'

const Model = use('Model')

class Supplier extends Model {
  branch() {
    return this.belongsTo("App/Models/Branch", "branch_id");
  }

  store() {
    return this.belongsTo("App/Models/Store", "store_id");
  }
}

module.exports = Supplier
