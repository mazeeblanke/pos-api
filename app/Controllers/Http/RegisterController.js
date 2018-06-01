'use strict'

const User = use('App/Models/User')
const Store = use('App/Models/Store')
const Branch = use('App/Models/Branch')
const Payment = use('App/Models/Payment')
const Config = use('Config')
const moment = require('moment')
const gravatar = require('gravatar-api')
const Mail = use('Mail')
const randomString = require('random-string')

class RegisterController {
  async store ({ request, response, auth }) {
    let paid = false
    let trial_length_in_days = Config.get('app.trialLengthInDays')
    let trial_ends_at = moment().add(30, 'days').format()
    let trial_starts_at = moment().format()
    let license_key

    var { name, email, currency, tax } = request.post().store

    let store = await Store.create({ name, email, currency, tax })

    const store_id = store.id

    const branches = request.post().branches

    const new_branches = []
    for (let branch of branches) {
      let {
        email,
        name,
        address,
        currency,
        printout,
        threshold,
        discount,
        receiptinfo
      } = branch

      if (email && name && address) {
        const branch = await Branch.create({
          email,
          name,
          threshold,
          discount,
          receiptinfo,
          address,
          store_id,
          currency,
          printout
        })
        new_branches.push(branch)
      }
    }

    let branch_id = new_branches[0].id

    const user_data = request.post().user

    var {
      email,
      password,
      full_name,
      access_level,
      status,
      username
    } = user_data

    let user = await User.create({
      username,
      email,
      password,
      full_name,
      access_level,
      status,
      branch_id,
      store_id
    })

    // await Mail.send('auth.emails.confirm_email', user.toJSON(), message => {
    //   message
    //     .to(user.email)
    //     .from('admin_pos@axximuth.com')
    //     .subject('Please confirm your email')
    // })

    Event.fire('new::user', user)

    await user.load('branch')

    user.store = store

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
      trial_starts_at
    })

    const user_token = await auth.attempt(email, password)

    response.status(200).json({
      message: 'Successfully created.',
      data: {
        store: store,
        branch: new_branches,
        user: {
          ...user.toJSON(),
          gravatar: gravatar.imageUrl({
            email: user.email,
            parameters: { size: '200', d: 'retro' }
          })
        },
        token: user_token
      }
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
