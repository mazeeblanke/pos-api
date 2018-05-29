'use strict'

const Schema = use('Schema')

class AddBranchidAccessFirstnameLastnameStatusToUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.string('full_name', 255).nullable();
      table.enu('access_level', ['admin', 'clerk', 'superadmin']).notNullable();
      table.enu('status', ['active', 'inactive']).notNullable();
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
      table.dropColumn('full_name');
      table.dropColumn('access_level');
      table.dropColumn('status');
      table.dropColumn('branch_id');
    })
  }
}

module.exports = AddBranchidAccessFirstnameLastnameStatusToUsersSchema
