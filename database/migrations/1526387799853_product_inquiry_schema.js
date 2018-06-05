'use strict'

const Schema = use('Schema')

class ProductInquirySchema extends Schema {
  up() {
    this.create('product_inquiries', (table) => {
      table.increments()
      table.timestamps()
      table.integer('customer_id')
      table.integer('user_id')
      table.integer('product_id')
      table.text('product_name')
      table.text('inquiry_note')
      table.text('actual_note')
      table.enu('status', ['available', 'not available'])
      table.datetime('expected_date')
      table.integer('branch_id')
      table.integer('quantity')
      table.integer('store_id')
    })
  }

  down() {
    this.drop('product_inquiries')
  }
}

module.exports = ProductInquirySchema
