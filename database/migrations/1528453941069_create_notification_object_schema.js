'use strict'

const Schema = use('Schema')

class CreateNotificationObjectSchema extends Schema {
  up () {
    this.create('notification_objects', (table) => {
      table.increments()
      table.timestamps()
      table.string('entity_type')
      table.integer('entity_id')
    })
  }

  down () {
    this.drop('notification_objects')
  }
}

module.exports = CreateNotificationObjectSchema
