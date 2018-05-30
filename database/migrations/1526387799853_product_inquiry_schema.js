'use strict'

const Schema = use('Schema')

class ProductInquirySchema extends Schema {
  up() {
    this.create('product_inquiries', (table) => {
      table.increments()
      table.timestamps()
      table.integer('customer_id')
      table.integer('product_id')
      table.text('product_name')
      table.text('inquiry_note')
      table.datetime('inquiry_date')
      table.datetime('expected_date')
      table.integer('branch')
      table.integer('store')
    })
  }

  down() {
    this.drop('product_inquiries')
  }
}

module.exports = ProductInquirySchema
