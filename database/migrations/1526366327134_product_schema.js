'use strict'

const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.timestamps()
      table.text('name')
      table.bigInteger('quantity')
      table.bigInteger('reorder')
      table.decimal('unitprice', 15, 2)
      table.decimal('costprice', 15, 2)
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
