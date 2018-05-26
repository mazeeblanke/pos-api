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

Factory.blueprint('App/Models/Product', (faker, i, data) => {
  return {
    name: faker.name(),
    quantity: faker.integer({ min: 20, max: 2000 }),
    unitprice: faker.floating({ min: 100, max: 500 }),
    costprice: faker.floating({ min: 0, max: 100 }),
    barcode: faker.string(),
    reorder: faker.integer({ min: 20, max: 2000 }),
    status: 'active',
    store_id: 1
  }
})

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    username: faker.name(),
    email: faker.email(),
    password: data.password || faker.string({ length: 8 }),
    store_id: data.store_id,
    branch_id: data.branch_id,
  }
})

Factory.blueprint('App/Models/Store', (faker) => {
  return {
    name: faker.name(),
    email: faker.email(),
    phone: faker.phone(),
    currency: {}
  }
})

Factory.blueprint('App/Models/Branch', (faker, i, data) => {
  return {
    name: faker.name(),
    email: faker.email(),
    address: faker.address(),
    store_id: data.store_id,
    receiptinfo: faker.sentence({ words: 5 }),
    threshold: faker.integer({ min: 20, max: 2000 }),
    discount: faker.integer({ min: 0, max: 100 }),
    currency: {}
  }
})
