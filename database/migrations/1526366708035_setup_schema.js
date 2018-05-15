'use strict'

const Schema = use('Schema')

class SetupSchema extends Schema {
  up() {
    this.create('setups', (table) => {
      table.increments()
      table.timestamps()
      table.integer('branch_id').references('branches.id')
      table.string('email')
      table.string('store')
      table.string('address')
      table.string('phone')
      table.text('receiptinfo')
      table.string('tax')
      table.string('currency')
      table.string('printout')

    })
  }

  down() {
    this.drop('setups')
  }
}

module.exports = SetupSchema
