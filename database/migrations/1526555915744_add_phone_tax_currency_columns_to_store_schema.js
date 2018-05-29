'use strict'

const Schema = use('Schema')

class AddPhoneTaxCurrencyColumnsToStoreSchema extends Schema {
  up () {
    this.table('stores', (table) => {
      // alter table
      table
        .jsonb("tax")
        .notNullable()
      table.string('phone').nullable()
      table.jsonb('currency').notNullable()
    })
  }

  down () {
    this.table('stores', (table) => {
      // reverse alternations
      table.dropColumn('tax')
      table.dropColumn('phone')
      table.dropColumn('currency')
    })
  }
}

module.exports = AddPhoneTaxCurrencyColumnsToStoreSchema
