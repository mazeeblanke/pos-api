'use strict'

const Model = use('Model')

class ProductTransfer extends Model {

  product () {
    return this.belongsTo('App/Models/Product', 'product_id')
  }

  branch() {
    return this.belongsTo('App/Models/Branch')
  }

  store() {
    return this.belongsTo('App/Models/Store', 'store_id')
  }
}

module.exports = ProductTransfer
