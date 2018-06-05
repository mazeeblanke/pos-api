'use strict'

const Model = use('Model')

class Refund extends Model {

  static get table() {
    return 'refund'
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  branch() {
    return this.belongsTo('App/Models/Branch')
  }

  product() {
    return this.belongsTo('App/Models/Product')
  }

  customerOrder () {
    return this.belongsTo(
      'App/Models/CustomerOrder', 
      'sale_details_id', 
      'sale_details_id'
    )
  }

}

module.exports = Refund
