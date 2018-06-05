'use strict'

const Model = use('Model')

class Bankingcash extends Model {
  static get table() {
    return 'bankingcashes'
  }

  branch() {
    return this.belongsTo("App/Models/Branch", "branch_id");
  }

  store() {
    return this.belongsTo("App/Models/Store", "store_id");
  }

  fromuser() {
    return this.belongsTo('App/Models/User', 'from_user')
  }

  touser() {
    return this.belongsTo('App/Models/User', 'to_user')
  }

}

module.exports = Bankingcash
