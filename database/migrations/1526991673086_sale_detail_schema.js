'use strict'

const Schema = use('Schema')

class SaleDetailSchema extends Schema {
  up () {
    this.create('sale_details', (table) => {
      table.increments()
      table.integer('branch_id').references('branches.id')
      table.integer('user_id').references('users.id')
      table
        .integer('store_id', 255)
        .notNullable()
        .references('id')
        .inTable('stores')
        .onDelete('cascade')
        .onUpdate('cascade')
      table.bigInteger('sales_id')
      table.decimal('tax', 15, 2)
      table.decimal('threshold', 15, 2)
      table.decimal('discount_per_threshold', 15, 2)
      table.decimal('discount', 15, 2)
      table.decimal('total', 15, 2)
      table.enu('payment_type', ['cash', 'card']).defaultTo('cash')
      table.timestamps()
    })
  }

  down () {
    this.drop('sale_details')
  }
}

module.exports = SaleDetailSchema
