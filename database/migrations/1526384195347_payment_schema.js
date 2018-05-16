'use strict'

const Schema = use('Schema')

class PaymentSchema extends Schema {
  up () {
    this.create('payments', (table) => {
      table.increments()
      table
        .integer('store_id', 255)
        .notNullable()
        .references('id')
        .inTable('stores')
        .onDelete('cascade')
        .onUpdate('cascade')
      table.string('license_key').nullable()
      table.boolean('paid').defaultTo(false)
      table.date('trial_ends_at').nullable()
      table.date('trial_starts_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentSchema
