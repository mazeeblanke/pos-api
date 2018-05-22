'use strict'

class PasswordController {

  async sendResetLinkEmail ({ request, response }) {
    const user = await user.findBy('email', email)

    await
  }
}

module.exports = PasswordController
