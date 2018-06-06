'use strict'

const Model = use('Model')

class Sale extends Model {

  static get computed () {
    return ['total']
  }

  getTotal ({ sub_total }) {
    return sub_total
  }

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

  branch() {
    return this.belongsTo("App/Models/Branch", "branch_id");
  }

  store() {
    return this.belongsTo("App/Models/Store", "store_id");
  }

}

module.exports = Sale
