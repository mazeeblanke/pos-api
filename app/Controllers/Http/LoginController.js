'use strict'

const User = use('App/Models/User')
const Store = use('App/Models/Store')

class LoginController {

  async store({ request, response, auth}) {

      const {email, password} = request.post()

      // const user2 = await User.query().where('email', email).where('is_active', true).first()
      // if (user2) {
      //   const user_token = await auth.attempt(email, password)
      // }


      const user = await User.query().where({ email }).with('branch.store').first()
      const user_token = await auth.attempt(email, password)

      if (user_token) {
        response.status(200).json({
          message: 'Login Successful',
          token: user_token,
          user: user,
        })
      } else {
        response.status(422).json({
          message: 'Email or Password not correct'
        })
      }

  }
}

module.exports = LoginController
