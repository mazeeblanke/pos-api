'use strict'

const Schema = use('Schema')

class AddPrintoutCurrencyReceiptinfoColumnsToBranchesSchema extends Schema {
  up () {
    this.table('branches', (table) => {
      // alter table
      table.text('receiptinfo').nullable()
      table.string('currency').notNullable()
      table.string('printout').notNullable().defaultTo('receipt')
    })
  }

  down () {
    this.table('branches', (table) => {
      // reverse alternations
      table.dropColumn('receiptinfo')
      table.dropColumn('currency')
      table.dropColumn('printout')
    })
  }
}

module.exports = AddPrintoutCurrencyReceiptinfoColumnsToBranchesSchema
