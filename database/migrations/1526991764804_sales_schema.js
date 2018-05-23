'use strict'

const Schema = use('Schema')

class SalesSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.timestamps()
      table.integer('sale_details_id').references('sale_details.id')
      table.integer('product_id').references('products.id')
      table
        .integer('user_id', 255)
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .onUpdate('cascade')
      table
        .integer('branch_id', 255)
        .notNullable()
        .references('id')
        .inTable('branches')
        .onDelete('cascade')
        .onUpdate('cascade')
      table
        .integer('store_id', 255)
        .notNullable()
        .references('id')
        .inTable('stores')
        .onDelete('cascade')
        .onUpdate('cascade')
      table.integer('quantity')
      table.enu('payment_type', ['cash', 'card']).defaultTo('cash')
      table.bigInteger('sales_id')
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