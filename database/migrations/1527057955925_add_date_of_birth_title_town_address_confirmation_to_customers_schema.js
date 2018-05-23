'use strict'

const Schema = use('Schema')

class AddDateOfBirthTitleTownAddressConfirmationToCustomersSchema extends Schema {
  up () {
    this.table('customers', (table) => {
      // alter table
      table.string('title')
      table.date('date_of_birth')
      table.string('town')
      table.string('confirmation')
    })
  }

  down () {
    this.table('customers', (table) => {
      // reverse alternations
      table.dropColumn('title')
      table.dropColumn('date_of_birth')
      table.dropColumn('town')
      table.dropColumn('confirmation')
    })
  }
}

module.exports = AddDateOfBirthTitleTownAddressConfirmationToCustomersSchema
