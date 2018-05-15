'use strict'

const Schema = use('Schema')

class SalesSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.timestamps()
      table.integer('branchid')
      table.integer('salesid')
      table.integer('productID').references('products.id')
      table.integer('userID').references('users.id')
      table.string('unitprice')
      table.string('quantity')
      table.string('total')
      table.datetime('salestime')
      table.string('discount')
      table.string('tax')
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SalesSchema
