'use strict'

const Schema = use('Schema')

class AddStoreIdToUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table
        .integer('store_id', 255)
        .notNullable()
        .references('id')
        .inTable('stores')
        .onDelete('cascade')
        .onUpdate('cascade')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('store_id')
    })
  }
}

module.exports = AddStoreIdToUsersSchema
