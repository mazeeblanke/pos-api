'use strict'

const Schema = use('Schema')

class NotificationChangeSchema extends Schema {
  up () {
    this.create('notification_changes', (table) => {
      table.increments()
      table.string('action')
      table.bigInteger('actor_id')
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
    this.drop('notification_changes')
  }
}

module.exports = NotificationChangeSchema
