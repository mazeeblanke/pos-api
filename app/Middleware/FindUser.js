'use strict'

class FindUser {
  async handle ({ request }, next) {
    // call next to advance the request
    console.log('MIDDLE FIRED asdf')
    await next()
  }
}

module.exports = FindUser
