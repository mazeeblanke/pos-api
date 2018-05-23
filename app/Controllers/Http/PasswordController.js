'use strict'

const User = use('App/Models/User')
const randomString = require('random-string')
const Mail = use('Mail')
const Hash = use('Hash')
class PasswordController {

  async sendResetLinkEmail ({ request, response }) {

    const user = await User.findBy('email', request.post().email)

    if (user) {

      user.confirmation_token =  randomString({
        charset: 'numeric',
        length: 6
      })

      await user.save()

      await Mail.send('auth.emails.password_reset', user.toJSON(), (message) => {
        message
          .to(user.email)
          // .from('admin_pos@axximuth.com')
          .from('i5dr0id308@gmail.com')
          .subject('Password Reset Code')
      })

      response.status(200).json({
        message: 'Email has been sent',
        data: user
      })

    } else {
      response.status(404).json({
        message: 'Email not found'
      })
    }
  }

  async resetPassword ({ request, response}) {
    const { email, reset_token, new_password } = request.post()

    console.log(email, reset_token, new_password)
    const user = await User.findBy('email',email)
    if (user.confirmation_token === reset_token) {
      const safePassword = await Hash.make(new_password)
      user.password = safePassword
      await user.save()

      response.status(200).json({
        message: 'Password reset suscessful',
        user
      })
    } else {
      response.status(404).json({
        message: 'Reset token not correct'
      })
    }
  }
}

module.exports = PasswordController
