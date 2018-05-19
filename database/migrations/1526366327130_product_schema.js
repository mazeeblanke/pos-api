'use strict'

const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.timestamps()
      table.text('name').unique()
      table.integer('quantity')
      table.decimal('unitprice', 15, 6)
      table.decimal('costprice', 15, 6)
      table.text('barcode')
      table.string('status')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
