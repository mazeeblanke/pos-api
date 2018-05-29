'use strict'

const Schema = use('Schema')

class RemoveTotalSalestimeDiscountTaxColumnsFromSalesAndAddSubtotalSchema extends Schema {
  up () {
    this.table('sales', (table) => {
      // alter table
      table.dropColumn('total')
      table.dropColumn('salestime')
      table.dropColumn('discount')
      table.dropColumn('tax')
      table.decimal('sub_total', 15, 2)
    })
  }

  down () {
    this.table('sales', (table) => {
      table.decimal('total', 15, 2)
      table.datetime('salestime')
      table.decimal('discount', 15, 2)
      table.decimal('tax', 15, 2)
      table.dropColumn('sub_total')
    })
  }
}

module.exports = RemoveTotalSalestimeDiscountTaxColumnsFromSalesAndAddSubtotalSchema
