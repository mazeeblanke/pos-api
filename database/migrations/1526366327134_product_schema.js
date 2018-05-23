'use strict'

const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.timestamps()
      table.text('name').unique()
      table.integer('quantity')
      table.integer('reorder')
      table.decimal('unitprice', 15, 6)
      table.decimal('costprice', 15, 6)
      table.text('barcode')
      table.string('status')
      table
        .integer('store_id', 255)
        .notNullable()
        .references('id')
        .inTable('stores')
        .onDelete('cascade')
        .onUpdate('cascade')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
