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
    username: faker.name().split(' ')[0],
    full_name: faker.name(),
    email: faker.email(),
    access_level: 'clerk',
    status: 'active',
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
    currency: {name: 'naira'},
    tax: null
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
    currency: { name: 'naira'},
    printout: 'receipt'
  }
})

Factory.blueprint('App/Models/Customer', (faker, i, data) => {
  return {
    full_name: faker.name(),
    // last_name: faker.last(),
    phone: faker.phone(),
    gender: faker.gender(),
    marital_status: 'single',
    email: faker.email(),
    address: faker.address(),
    title: faker.prefix(),
    country: faker.country({ full: true }),
    town: faker.city(),
    store_id: data.store_id,
    date_of_birth: faker.date(),
    cardnumber: faker.fbid(),
    confirmation: faker.hash()
  }
})

Factory.blueprint('App/Models/Branch', (faker, i, data) => {
  return {
    name: faker.name(),
    address: faker.address(),
    store_id: data.store_id || 1,
    currency: {}
  }
})

Factory.blueprint('App/Models/Supplier', (faker, i, data) => {
  return {
    name: faker.name(),
    address: faker.address(),
    email: faker.email(),
    phone: faker.phone(),
    store_id: data.store_id || 1
  }
})

Factory.blueprint('App/Models/Expenditure', (faker, i, data) => {
  return {
    type: faker.word(),
    title: faker.word(),
    amount: faker.floating({ min: 0, max: 1000 }),
    details: faker.sentence(),
    store_id: data.store_id || 1,
    user_id: data.user_id || 1,
    branch_id: data.branch_id || 1
  }
})

Factory.blueprint('App/Models/Openingcash', (faker, i, data) => {
  return {
    from_user: faker.integer({ min: 1, max: 50 }),
    to_user: faker.integer({ min: 1, max: 50 }),
    amount: faker.floating({ min: 0, max: 1000 }),
    details: faker.sentence(),
    store_id: data.store_id || 1,
    branch_id: data.branch_id || 1
  }
})

Factory.blueprint('App/Models/Bankingcash', (faker, i, data) => {
  return {
    from_user: faker.integer({ min: 1, max: 50 }),
    to_user: faker.integer({ min: 1, max: 50 }),
    amount: faker.floating({ min: 0, max: 1000 }),
    details: faker.sentence(),
    bank: faker.word(),
    store_id: data.store_id || 1,
    branch_id: data.branch_id || 1
  }
})
