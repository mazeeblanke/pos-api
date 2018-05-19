'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/Product', (faker) => {
  return {
    name: faker.name(),
    quantity: faker.integer({ min: 20, max: 2000 }),
    unitprice: faker.floating({ min: 100, max: 500 }),
    costprice: faker.floating({ min: 0, max: 100 }),
    barcode: faker.string(),
    status: 'active'
  }
})

