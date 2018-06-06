'use strict'

const Schema = use('Schema')

class AddCostpriceToSalesSchema extends Schema {
  up () {
    this.table('sales', (table) => {
      // alter table
      table.decimal('costprice', 15, 2)
    })
  }

  down () {
    this.table('sales', (table) => {
      // reverse alternations
      table.dropColumn('costprice')
    })
  }
}

module.exports = AddCostpriceToSalesSchema
