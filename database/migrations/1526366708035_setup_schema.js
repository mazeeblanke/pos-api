'use strict'

const Schema = use('Schema')

class SetupSchema extends Schema {
  up () {
    this.create('setups', (table) => {
      table.increments()
      table.timestamps()
      table.string('branchID')
    })
  }

  down () {
    this.drop('setups')
  }
}

module.exports = SetupSchema
