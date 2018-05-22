'use strict'

const Schema = use('Schema')

class SalesSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.timestamps()
      table.integer('sale_details_id').references('sale_details.id')
      table.integer('product_id').references('products.id')
      table.integer('quantity')
      table.decimal('unit_price', 15, 6)
      table.decimal('total', 15, 6)
      table.datetime('salestime')
      table.decimal('discount', 15, 6)
      table.decimal('tax', 15, 6)
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SalesSchema
