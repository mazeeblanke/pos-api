'use strict'

const User = use('App/Models/User')
const Store = use('App/Models/Store')
const gravatar = require('gravatar-api')


class LoginController {

  async store({ request, response, auth}) {

      const {email, password} = request.post()

      let user = await User.query().where({ email }).with('branch').with('store').first()
      const user_token = await auth.attempt(email, password)

      user = user.toJSON()

      if (user_token) {
        response.status(200).json({
          message: 'Login Successful',
          token: user_token,
          branch: user.branch,
          store: user.store,
          user: {
            ...user,
            gravatar: gravatar.imageUrl({
              email: user.email,
              parameters: { "size": "200", "d": "retro" },
            })
          }
        })
      } else {
        response.status(422).json({
          message: 'Email or Password not correct'
        })
      }

  }
}

module.exports = LoginController
