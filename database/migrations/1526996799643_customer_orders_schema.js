'use strict'

const Schema = use('Schema')

class CustomerOrdersSchema extends Schema {
  up () {
    this.create('customer_orders', (table) => {
      table.increments()
      table.timestamps()
      table.integer('sale_details_id').references('sale_details.sale_details_id')
      table.integer('sale_id').references('sales.id')
      table.integer('customer_id').references('customers.id')
      table.string('gross')
    })
  }

  down () {
    this.drop('customer_orders')
  }
}

module.exports = CustomerOrdersSchema
