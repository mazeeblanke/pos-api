'use strict'

const Schema = use('Schema')

class AddCompositeUniqueKeyToUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // table.unique(['store_id', 'branch_id', 'email'])
    })
  }

  down () {
    this.table('users', (table) => {
      // table.drop(['store_id', 'branch_id', 'email'])
    })
  }
}

module.exports = AddCompositeUniqueKeyToUsersSchema
