'use strict'

class AuthenticateToken {
  async handle ({ request, response, auth }, next) {
    // call next to advance the request
    // try {
    //   const check = await auth.check()
    //   if (check) {
    //     await next()
    //   }
    // } catch (error) {
    //   console.log(error)
    //   response.status(404).json({message: 'Missing or invalid jwt token'})
    // }
    const check = await auth.check()
    if (check) {
      await next()
    } else {
      response
        .status(404)
        .json({ message: "Missing or invalid jwt token" });
    }
  }
}

module.exports = AuthenticateToken
