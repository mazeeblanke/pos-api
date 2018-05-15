'use strict'

const Schema = use('Schema')

class SalesSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.timestamps()
      table.integer('branch_id')
      table.integer('sales_id')
      table.integer('product_id').references('products.id')
      table.integer('user_id').references('users.id')
      table.string('unit_price')
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
