'use strict'

/*
|--------------------------------------------------------------------------
| SupplierSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class SupplierSeeder {
  async run () {
    await Factory.model('App/Models/Supplier').createMany(50, { store_id: 1 })
  }
}

module.exports = SupplierSeeder
