'use strict'

const Schema = use('Schema')

class AddBranchidAccessFirstnameLastnameStatusToUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.enu('access_level', ['admin', 'clerk', 'superadmin']);
      table.enu('status', ['active', 'inactive']);
      table
        .integer('branch_id', 255)
        .notNullable()
        .references('id')
        .inTable('branches')
        .onDelete('cascade')
        .onUpdate('cascade');
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('first_name');
      table.dropColumn('last_name');
      table.dropColumn('access_level');
      table.dropColumn('status');
      table.dropColumn('branch_id');
    })
  }
}

module.exports = AddBranchidAccessFirstnameLastnameStatusToUsersSchema
