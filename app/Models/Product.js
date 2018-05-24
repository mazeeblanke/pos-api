'use strict'

const Model = use('Model')

class Product extends Model {


  branches () {
    return this.belongsToMany('App/Models/Branch', 'product_id', 'branch_id')
      .pivotTable('product_branches')
      .withPivot(['quantity'])
  }
}

module.exports = Product
