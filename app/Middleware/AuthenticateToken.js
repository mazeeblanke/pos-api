'use strict'

class AuthenticateToken {
  async handle ({ request, response, auth }, next) {
    // call next to advance the request
    try {
      const check = await auth.check()
      if (check) {
        response.status(200).json({
          message: 'All Sales record',
          data: "response"
        })
      }
    } catch (error) {
      response.status(404).json({message: 'Missing or invalid jwt token'})
    }
    await next()
  }
}

module.exports = AuthenticateToken
