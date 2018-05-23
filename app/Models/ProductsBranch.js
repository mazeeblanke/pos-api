'use strict'

const Model = use('Model')

class ProductsBranch extends Model {
  static get table() {
    return 'product_branches'
  }
}

module.exports = ProductsBranch
