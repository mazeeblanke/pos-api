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

    var { name, email, currency } = request.post().store;

    let store = await Store.create({name, email, currency })
  
    const store_id = store.id

    const branches = request.post().branches
    const new_branches = []
    for (let branch of branches) {
      let { email, name, address, currency } = branch
      if (email && name && address) {
        const branch = await Branch.create({email, name, address, store_id, currency})
        new_branches.push(branch)
      }
    }

    let branch_id = new_branches[0].id


    const user_data = request.post().user
    var {email, password, full_name, access_level, status, username} = user_data
    let user = await User.create({username, email, password, full_name, access_level, status, branch_id, store_id})


    await Mail.send('auth.emails.confirm_email', user.toJSON(), (message) => {
      message
        .to(user.email)
        .from('admin_pos@axximuth.com')
        .subject('Please confirm your email')
    })

    await user.load('branch')

    user.store =  store

<<<<<<< HEAD

    //payment
=======
>>>>>>> 9da0e9ba2a7d04731512eaaed819f76fc2806eb5
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

<<<<<<< HEAD


    // Authenticate
    console.log("detail: ", email,password)
    const user_token = await auth.attempt(email, password)

    response.status(201).json({
=======
    const user_token = await auth.attempt(email, password)


    response.status(200).json({
>>>>>>> 9da0e9ba2a7d04731512eaaed819f76fc2806eb5
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
