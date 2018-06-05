'use strict'

const Model = use('Model')

class ProductInquiry extends Model {

  static get table() {
    return 'product_inquiries'
  }

  customer () {
    return this.belongsTo('App/Models/Customer', 'customer_id')
  }

  user () {
    return this.belongsTo('App/Models/User', 'user_id')
  }

  product () {
    return this.belongsTo('App/Models/Product', 'product_id')
  }

  branch() {
    return this.belongsTo('App/Models/Branch')
  }

  store() {
    return this.belongsTo('App/Models/Store')
  }

}

module.exports = ProductInquiry
