'use strict'

const Schema = use('Schema')

class SupplierSchema extends Schema {
  up () {
    this.create('suppliers', (table) => {
      table.increments()
      table.string('name')
      table.string('email')
      table.string('phone')
      table.text('address')
      // table
      //   .integer('branch_id', 255)
      //   .notNullable()
      //   .references('id')
      //   .inTable('branches')
      //   .onDelete('cascade')
      //   .onUpdate('cascade')
      table
        .integer('store_id', 255)
        .notNullable()
        .references('id')
        .inTable('stores')
        .onDelete('cascade')
        .onUpdate('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('suppliers')
  }
}

module.exports = SupplierSchema
