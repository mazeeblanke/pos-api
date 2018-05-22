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
      table.decimal('sub_total', 15, 6)
    })
  }

  down () {
    this.table('sales', (table) => {
      table.decimal('total', 15, 6)
      table.datetime('salestime')
      table.decimal('discount', 15, 6)
      table.decimal('tax', 15, 6)
      table.bigInteger('sales_id')
      table.dropColumn('sub_total')
    })
  }
}

module.exports = RemoveTotalSalestimeDiscountTaxColumnsFromSalesAndAddSubtotalSchema
