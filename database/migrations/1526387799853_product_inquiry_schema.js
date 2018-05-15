'use strict'

const Schema = use('Schema')

class ProductInquirySchema extends Schema {
  up() {
    this.create('product_inquiries', (table) => {
      table.increments()
      table.timestamps()
      table.integer('customer_id').references('customers.id')
      table.integer('product_id').references('products.id')
      table.text('inquirynote')
      table.text('actualnote')
      table.datetime('inquirydate')
      table.datetime('expecteddate')
      table.datetime('actualdate')
    })
  }

  down() {
    this.drop('product_inquiries')
  }
}

module.exports = ProductInquirySchema
