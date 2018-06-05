'use strict'

/*
|--------------------------------------------------------------------------
| ExpenditureSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class ExpenditureSeeder {
  async run () {
    await Factory.model('App/Models/Expenditure').createMany(100, { store_id: 1, branch_id: 1, user_id: 1 })
    // await Factory.model('App/Models/Expenditure').createMany(60, { store_id: 1, branch_id: 1 })
  }
}

module.exports = ExpenditureSeeder
