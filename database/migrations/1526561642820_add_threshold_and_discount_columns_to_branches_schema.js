'use strict'

const Schema = use('Schema')

class AddThresholdAndDiscountColumnsToBranchesSchema extends Schema {
  up () {
    this.table('branches', (table) => {
      // alter table
      table.integer('threshold')
      table.integer('discount')
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
