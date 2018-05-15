'use strict'

const Schema = use('Schema')

class AddStoreIdToCustomerSchema extends Schema {
  up () {
    this.table('customers', (table) => {
      // alter table
      table
        .integer('store_id', 255)
        .notNullable()
        .references('id')
        .inTable('stores')
        .onDelete('cascade')
        .onUpdate('cascade');
    })
  }

  down () {
    this.table('customers', (table) => {
      // reverse alternations
      table.dropColumn('store_id')
    })
  }
}

module.exports = AddStoreIdToCustomerSchema
