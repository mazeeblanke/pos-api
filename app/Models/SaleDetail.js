'use strict'

const Model = use('Model')

class SaleDetail extends Model {

  // static get primaryKey () {
  //   return 'sale_details_id'
  // }

  static get primaryKey () {
    return 'sale_details_id'
  }

  customerOrder () {
    return this.hasOne(
      'App/Models/CustomerOrder',
      'id',
      'sale_details_id'
    )
  }

  user () {
    return this.belongsTo('App/Models/User', 'user_id')
  }

  sales () {
    return this.hasMany('App/Models/Sale', 'sales_id', 'sales_id')
  }

}

module.exports = SaleDetail
