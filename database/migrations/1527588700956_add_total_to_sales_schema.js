'use strict'

const Schema = use('Schema')

class AddTotalToSalesSchema extends Schema {
  up () {
    this.table('sales', (table) => {
      // alter table
    })
  }

  down () {
    this.table('sales', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddTotalToSalesSchema
