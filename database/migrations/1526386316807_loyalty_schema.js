'use strict'

const Schema = use('Schema')

class LoyaltySchema extends Schema {
  up () {
    this.create('loyalties', (table) => {
      table.increments()
      table.integer('threshold')
      table.integer('discount')
      table.timestamps()
    })
  }

  down () {
    this.drop('loyalties')
  }
}

module.exports = LoyaltySchema
