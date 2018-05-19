'use strict'

const User = use('App/Models/User')
const Store = use('App/Models/Store')
const Branch = use('App/Models/Branch')
const Payment = use('App/Models/Payment')
const Config = use('Config')
const moment = require('moment')

class RegisterController {

  async store({ request, response, auth}) {
    let paid = false
    let trial_length_in_days = Config.get('app.trialLengthInDays')
    let trial_ends_at = moment().add(30, 'days').format()
    let trial_starts_at = moment().format()
    let license_key

    console.log('here 1')
    // Create Store
    var { name, email, currency } = request.post().store;
    var store = await Store.create({name, email, currency})
    console.log(store)
    const store_id = store.id

    console.log('here 2')

    // Create Branches
    const branches = request.post().branches
    const new_branches = []
    for (let branch of branches) {
      var { email, name, address, currency } = branch
      if (email && name && address) {
        const branch = await Branch.create({email, name, address, store_id, currency})
        new_branches.push(branch)
      }
    }

    console.log('here 3')

    // HQ branch ID
    var branch_id = new_branches[0].id

    // create user
    const user_data = request.post().user
    var {email, password, full_name, access_level, status, username} = user_data
    var user = await User.create({username, email, password, full_name, access_level, status, branch_id, store_id})

    await user.load('branch')

    user.store =  store

    console.log('here 4')


    //payment
    if (request.post().paymentPlan !== 'trial') {
      trial_ends_at = null
      trial_starts_at = null
      paid = true
      license_key = Date.now()
    }

    await Payment.create({
      store_id,
      license_key,
      paid,
      trial_ends_at,
      trial_starts_at,
    })

    console.log('here 4')

    // Authenticate
    console.log("detail: ", email,password)
    const user_token = await auth.attempt(email, password)


    response.status(201).json({
      message: 'Successfully created.',
      data: {"store": store, "branch" : new_branches, "user" : user, "token": user_token}
    })
  }
}

module.exports = RegisterController
