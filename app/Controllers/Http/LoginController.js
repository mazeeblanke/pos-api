'use strict'

class LoginController {

  async store({ request, response}) {

      const {username, password} = request.post().store

    response.status(201).json({
      message: ' Welcome to login',
      data: {"username": username, "password": password}
    })
  }
}

module.exports = LoginController
