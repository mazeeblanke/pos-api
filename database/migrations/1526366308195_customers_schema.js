'use strict'

const Schema = use('Schema')

class CustomersSchema extends Schema {
  up() {
    this.create('customers', (table) => {
      table.increments()
      table.timestamps()
      table.string('full_name')
      // table.string('last_name')
      table.string('phone')
      table.string('gender')
      table.string('marital_status')
      table.string('email')
      table.text('address')
      // table.string('city')
      table.string('country')
      // table.string('postalcode')
      table.string('cardnumber')
    })
  }

  down() {
    this.drop('customers')
  }
}

module.exports = CustomersSchema
