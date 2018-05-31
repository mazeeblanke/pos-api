'use strict'

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class ProductSeeder {
  async run () {
    await Factory.model('App/Models/Product').createMany(50, { store_id: 1 })
    await Factory.model('App/Models/Store').createMany(50)
    await Factory.model('App/Models/Branch').createMany(50, { store_id: 1 })
    await Database.table('product_branches').insert([
      { quantity: 100, product_id: 1, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 2, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 3, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 4, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 5, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 6, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 7, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 8, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 9, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 10, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 11, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 12, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 13, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 14, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 15, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 16, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 18, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 19, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 20, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 21, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 22, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 23, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 24, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 25, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 26, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 27, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 28, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 29, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 30, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 31, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 32, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 33, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 34, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 35, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 36, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 37, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 38, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 39, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 40, branch_id: 1, store_id: 1},
      { quantity: 100, product_id: 41, branch_id: 1, store_id: 1},
    ])
    await Factory.model('App/Models/User').createMany(60, { store_id: 1, branch_id: 1 })
  }
}

module.exports = ProductSeeder
