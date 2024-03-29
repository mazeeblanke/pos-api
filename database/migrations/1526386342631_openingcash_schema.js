'use strict'

const Schema = use('Schema')

class OpeningcashSchema extends Schema {
  up () {
    this.create('openingcashes', (table) => {
      table.increments()
      table.timestamps()
      table.integer('store_id').references('stores.id')
      table.integer('branch_id').references('branches.id')
      table.decimal('amount', 15, 2)
      table.integer('from_user').references('users.id')
      table.integer('to_user').references('users.id')
      table.text('details')
    })
  }

  down () {
    this.drop('openingcashes')
  }
}

module.exports = OpeningcashSchema
