'use strict'

const Model = use('Model')

class Openingcash extends Model {
  static get table() {
    return 'openingcashes'
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

module.exports = Openingcash
