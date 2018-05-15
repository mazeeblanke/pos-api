'use strict'

const Schema = use('Schema')

class ExpenditureSchema extends Schema {
  up () {
    this.create('expenditures', (table) => {
      table.increments()
      table.timestamps()
      table.integer('branch_id').references('branches.id')
      table.datetime('expendituretime')
      table.integer('user').references('users.id')
      table.string('type')
      table.string('title')
      table.string('amount')
      table.text('details')
    })
  }

  down () {
    this.drop('expenditures')
  }
}

module.exports = ExpenditureSchema
