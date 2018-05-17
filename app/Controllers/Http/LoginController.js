'use strict'

const User = use('App/Models/User')
class LoginController {

  async store({ request, response, auth}) {

      const {email, password} = request.post()
      // const user = await User.with('branch').findBy('email', email)
      const user = await User.query().where({email: 'mazino2@yahoo.com'}).with('branch.store').fetch()
                         
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
