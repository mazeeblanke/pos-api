'use strict'

const Model = use('Model')

class Sale extends Model {

  customerOrder () {
    return this.belongsTo(
      'App/Models/CustomerOrder', 
      'sale_details_id', 
      'sale_details_id'
    )
  }

  user () {
    return this.belongsTo('App/Models/User', 'user_id')
  }

  product () {
    return this.belongsTo('App/Models/Product', 'product_id')
  }

  refund () {
    return this.hasMany('App/Models/Refund')
  }

}

module.exports = Sale
