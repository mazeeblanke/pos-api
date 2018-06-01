'use strict'

/*
|--------------------------------------------------------------------------
| BranchSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class BranchSeeder {
  async run () {
    // await Factory.model('App/Models/Branch').createMany(80, { store_id: 2 })
  }
}

module.exports = BranchSeeder
