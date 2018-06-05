'use strict'

const Model = use('Model')

class Expenditure extends Model {
  static get table() {
    return 'expenditures'
  }

  branch() {
    return this.belongsTo("App/Models/Branch", "branch_id");
  }

  store() {
    return this.belongsTo("App/Models/Store", "store_id");
  }

  user() {
    return this.belongsTo('App/Models/User', 'user_id')
  }
  
}

module.exports = Expenditure
