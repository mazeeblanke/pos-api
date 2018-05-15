'use strict'

class UserController {

  async store ({ request, response }) {
    const {email, password} = request.post()
    response.json({
      USERUSER: 'USER USER USER.'
    })
  }


  async login ({ request, auth }) {
    const { email, password } = request.all()
    await auth.attempt(email, password)

    return 'Logged in successfully'
  }

  show ({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return 'You cannot see someone else\'s profile'
    }
    return auth.user
  }
}

module.exports = UserController
