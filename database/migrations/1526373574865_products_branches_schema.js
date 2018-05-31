'use strict'

const Schema = use('Schema')

class ProductsBranchesSchema extends Schema {
  up () {
    this.create('product_branches', (table) => {
      table.increments()
      table.integer('quantity').notNullable()
      table
        .integer('product_id', 255)
        .notNullable()
        .references('id')
        .inTable('products')
        .onDelete('cascade')
        .onUpdate('cascade');
      table
        .integer('branch_id', 255)
        .notNullable()
        .references('id')
        .inTable('branches')
        .onDelete('cascade')
        .onUpdate('cascade');
      table.integer('store_id').references('stores.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_branches')
  }
}

module.exports = ProductsBranchesSchema
