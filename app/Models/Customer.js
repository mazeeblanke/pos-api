'use strict'

const Model = use('Model')

class Customer extends Model {

  store() {
    return this.belongsTo('App/Models/Store', 'store_id')
  }

}

module.exports = Customer
