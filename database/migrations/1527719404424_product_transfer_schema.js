'use strict'

const Schema = use('Schema')

class ProductTransferSchema extends Schema {
  up() {
    this.create('product_transfers', (table) => {
      table.increments()
      table.timestamps()
      table.biginteger('transfer_id')
      table.integer('store_id').references('stores.id')
      table.integer('user_id').references('users.id')
      table.integer('source_id')
      table.integer('to_branch_id').references('branches.id')
      table.integer('product_id').references('products.id')
      table.integer('quantity_transferred')
      table.enu('source', ['store','branch']).notNullable();
    })
  }

  down() {
    this.drop('product_transfers')
  }
}

module.exports = ProductTransferSchema
