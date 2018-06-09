'use strict'

const Schema = use('Schema')

class BranchSchema extends Schema {
  up () {
    this.create('branches', (table) => {
      table.increments()
      table
        .string('email', 254)
        .notNullable()
      table
        .string('name', 255)
        .notNullable()
      table
        .string('address', 255)
        .nullable()
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
    this.drop('branches')
  }
}

module.exports = BranchSchema
