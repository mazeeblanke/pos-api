'use strict'

const Model = use('Model')

class Product extends Model {

  branches () {
    return this.belongsToMany('App/Models/Branch', 'product_id', 'branch_id')
      .pivotTable('product_branches')
      .withPivot(['quantity'])
  }

  productBranches () {
    return this.hasMany('App/Models/ProductsBranch', 'id')
  }

  productBranch () {
    return this.hasOne('App/Models/ProductsBranch', 'id')
  }

}

module.exports = Product
