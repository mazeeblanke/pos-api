'use strict'

const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.timestamps()
      table.text('name').unique()
      table.integer('quantity')
      table.string('unitprice')
      table.string('costprice')
      table.text('barcode')
      table.string('status')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
