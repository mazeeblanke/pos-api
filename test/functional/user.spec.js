'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')



test('A user with the right credentials can login', async ({ assert, client }) => {
  const store = await Factory.model('App/Models/Store').create()
  const branch = await Factory.model('App/Models/Branch').create({ store_id: store.id  })
  const user = await Factory.model('App/Models/User').create({
    store_id: store.id,
    branch_id: branch.id,
    password: 'password'
  })


  const response = await client.post('/login')
  .send({
    email: user.email,
    password: 'password'
  })
  .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    message: 'Login Successful'
  })
})


test('A user with the wrong credentials', async ({ assert, client }) => {
  const store = await Factory.model('App/Models/Store').create()
  const branch = await Factory.model('App/Models/Branch').create({ store_id: store.id  })
  const user = await Factory.model('App/Models/User').create({
    store_id: store.id,
    branch_id: branch.id,
    password: 'password'
  })


  const response = await client.post('/login')
  .send({
    email: user.email,
    password: 'wrong password'
  })
  .end()

  response.assertStatus(401)
  response.assertError([
    {
      message: 'Invalid user password',
      field: 'password'
    }
  ])
})



test('An admin can register a company with branches with the right credentials', async ({ assert, client }) => {
  const store = await Factory.model('App/Models/Store').create()
  const branch = await Factory.model('App/Models/Branch').create({ store_id: store.id })
  const user = await Factory.model('App/Models/User').create({ store_id: store.id, branch_id: branch.id })
  const paymentPlan = 'trial'

  const payload = {
    user,
    branches: [branch],
    paymentPlan,
    store
  }

  await user.delete()
  await branch.delete()
  await store.delete()

  const response = await client
  .post('/register')
  .send(payload)
  .end()

  console.log(response.error)

  response.assertStatus(200)
  response.assertJSONSubset({
    message: 'Successfully created.',
    data: {
      store: {
        name: store.name
      },
      user: {
        username: user.username
      }
    }
  })
})

// test('An admin cannot register a company with branches with the wrong/missing credentials', async ({
//   assert,
//   client
// }) => {
//   const store = await Factory.model('App/Models/Store').create()
//   const branch = await Factory.model('App/Models/Branch').create({
//     store_id: store.id
//   })
//   const paymentPlan = 'trial'

//   const payload = {
//     branches: [branch],
//     paymentPlan,
//     store
//   }

//   await branch.delete()
//   await store.delete()

//   const response = await client.post('/register').send(payload).end()

//   console.log(response.error)

//   response.assertStatus(401)

// })

