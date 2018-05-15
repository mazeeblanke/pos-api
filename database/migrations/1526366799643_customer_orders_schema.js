'use strict'

const Schema = use('Schema')

class CustomerOrdersSchema extends Schema {
  up () {
    this.create('customer_orders', (table) => {
      table.increments()
      table.timestamps()
      table.integer('customer_id').references('customers.id')
      table.integer('sales_id').references('sales.id')
    })
  }

  down () {
    this.drop('customer_orders')
  }
}

module.exports = CustomerOrdersSchema
