'use strict'

const Model = use('Model')

class ProductsBranch extends Model {
  static get table() {
    return 'product_branches'
  }

  branch() {
    return this.belongsTo('App/Models/Branch')
  }

  product() {
    return this.belongsTo('App/Models/Product')
  }
}

module.exports = ProductsBranch
