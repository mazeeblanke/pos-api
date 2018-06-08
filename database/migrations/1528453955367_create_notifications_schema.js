'use strict'

const Schema = use('Schema')

class CreateNotificationsSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.string('action')
      table.bigInteger('subject_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .onUpdate('cascade')
      table.bigInteger('notification_obj_id')
        // .notNullable()
        .references('id')
        .inTable('notification_objects')
        .onDelete('cascade')
        .onUpdate('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = CreateNotificationsSchema
