'use strict'

const Schema = use('Schema')

class AddDateOfBirthTitleTownAddressConfirmationToCustomersSchema extends Schema {
  up () {
    this.table('customers', (table) => {
      // alter table
      table.string('title')
      table.string('date_of_birth')
      table.string('town')
      table.string('confirmation')
    })
  }

  down () {
    this.table('customers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddDateOfBirthTitleTownAddressConfirmationToCustomersSchema
