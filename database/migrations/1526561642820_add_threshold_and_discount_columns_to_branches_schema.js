'use strict'

const Schema = use('Schema')

class AddThresholdAndDiscountColumnsToBranchesSchema extends Schema {
  up () {
    this.table('branches', (table) => {
      // alter table
      table.integer('threshold').defaultTo(0)
      table.integer('discount').defaultTo(0)
    })
  }

  down () {
    this.table('branches', (table) => {
      // reverse alternations
      table.dropColumn('threshold')
      table.dropColumn('discount')
    })
  }
}

module.exports = AddThresholdAndDiscountColumnsToBranchesSchema
