'use strict'

const Schema = use('Schema')

class BankingcashSchema extends Schema {
  up () {
    this.create('bankingcashes', (table) => {
      table.increments()
      table.timestamps()
      table.integer('brach_id')
      table.integer('from_user').references('users.id')
      table.integer('to_user').references('users.id')
      table.string('amount')
      table.string('bank')
      table.datetime('bankingcashtime')
      table.text('details')
    })
  }

  down () {
    this.drop('bankingcashes')
  }
}

module.exports = BankingcashSchema
