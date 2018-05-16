'use strict'

const User = use('App/Models/User')
class LoginController {

  async store({ request, response, auth}) {

      const {email, password} = request.post()
      const user = await User.findBy('email', email)
      const user_token = await auth.attempt(email, password)

        if (user_token) {
          response.status(201).json({
            message: 'Login Successful',
            token: user_token,
            user: user
          })
        } else {
          response.status(422).json({
            message: 'Username or Password not correct'
          })
        }

  }
}

module.exports = LoginController
