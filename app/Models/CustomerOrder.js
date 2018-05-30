'use strict'

const Model = use('Model')

class CustomerOrder extends Model {

  customer () {
    return this.belongsTo(
      'App/Models/Customer',
      'customer_id'
    )
  }
}

module.exports = CustomerOrder
