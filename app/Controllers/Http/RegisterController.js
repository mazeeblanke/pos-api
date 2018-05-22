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


    await user.load('branch')

    user.store =  store

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

    const user_token = await auth.attempt(email, password)


    response.status(200).json({
      message: 'Successfully created.',
      data: {"store": store, "branch" : new_branches, "user" : user, "token": user_token}
    })
  }
}

module.exports = RegisterController
