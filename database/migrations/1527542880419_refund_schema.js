'use strict'

const Schema = use('Schema')

class RefundSchema extends Schema {
  up () {
    this.create('refund', (table) => {
      table.increments()
      table.timestamps()
      table.integer('sales_id').references('sales.id')
      table.integer('sale_details_id').references('sale_details.id')
      table.integer('product_id').references('products.id')
      table.integer('store_id').references('stores.id')
      table.integer('branch_id').references('branches.id')
      table.integer('user_id').references('users.id')
      table.integer('quantity_ordered')
      table.integer('quantity_returned')
      table.decimal('unit_price', 15, 6)
    })
  }

  down () {
    this.drop('refund')
  }
}

module.exports = RefundSchema
