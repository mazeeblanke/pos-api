'use strict'

const Schema = use('Schema')

class DropLoyaltiesSchema extends Schema {
  up () {
    this.dropTable('loyalties')
  }

  down () {
    this.create('loyalties', (table) => {
      table.increments()
      table.integer('threshold')
      table.integer('discount')
      table.timestamps()
    })
  }
}

module.exports = DropLoyaltiesSchema
