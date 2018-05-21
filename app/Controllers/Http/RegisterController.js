'use strict'

const User = use('App/Models/User')
const Store = use('App/Models/Store')
const Branch = use('App/Models/Branch')
const Payment = use('App/Models/Payment')
const Config = use('Config')
const moment = require('moment')
const Mail = use('Mail')
const randomString = require('random-string')

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
    var user = await User.create({username, email, password,confirmation_token: randomString({length: 40}), full_name, access_level, status, branch_id, store_id})

    await Mail.send('auth.emails.confirm_email', user.toJSON(), (message) => {
      message
        .to(user.email)
        .from('admin_pos@axximuth.com')
        .subject('Please confirm your email')
    })

    await user.load('branch')

    user.store =  store


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



    // Authenticate
    console.log("detail: ", email,password)
    const user_token = await auth.attempt(email, password)

    response.status(201).json({
      message: 'Successfully created.',
      data: {"store": store, "branch" : new_branches, "user" : user, "token": user_token}
    })
  }

  async confirmEmail ({ request, response, params }) {
    const user = await User.findBy('confirmation_token', params.token)

    user.confirmation_token = null
    user.is_active = true

    await user.save()


    response.status(201).json({
      message: 'Account Confirmed.',
      payload: user
    })
  }
}

module.exports = RegisterController
