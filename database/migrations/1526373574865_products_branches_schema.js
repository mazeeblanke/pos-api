'use strict'

const Schema = use('Schema')

class ProductsBranchesSchema extends Schema {
  up () {
    this.create('products_branches', (table) => {
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
      table.timestamps()
    })
  }

  down () {
    this.drop('products_branches')
  }
}

module.exports = ProductsBranchesSchema
