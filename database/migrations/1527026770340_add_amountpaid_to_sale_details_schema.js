'use strict'

const Schema = use('Schema')

class AddAmountpaidToSaleDetailsSchema extends Schema {
  up() {
    this.table('sale_details', (table) => {
      // alter table
      table.decimal('amount_paid', 15, 2)
    })
  }

  down() {
    this.table('sale_details', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddAmountpaidToSaleDetailsSchema
