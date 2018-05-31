'use strict'

const Schema = use('Schema')

class ProductTransferSchema extends Schema {
  up() {
    this.create('product_transfers', (table) => {
      table.increments()
      table.timestamps()
      table.biginteger('transfer_id')
      table.integer('store_id').references('stores.id')
      table.integer('from_branch_id').references('branches.id')
      table.integer('to_branch_id').references('branches.id')
      table.integer('product_id').references('products.id')
      table.integer('quantity_transferred')
    })
  }

  down() {
    this.drop('product_transfers')
  }
}

module.exports = ProductTransferSchema
