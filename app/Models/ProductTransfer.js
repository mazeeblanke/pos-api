'use strict'

const Model = use('Model')

class ProductTransfer extends Model {

  product () {
    return this.belongsTo('App/Models/Product', 'product_id')
  }

  branch() {
    return this.belongsTo('App/Models/Branch', 'to_branch_id')
  }

  store() {
    return this.belongsTo('App/Models/Store', 'store_id')
  }

  user () {
    return this.belongsTo('App/Models/User', 'user_id')
  }
}

module.exports = ProductTransfer
