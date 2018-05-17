'use strict'

class StoreUser {
  get rules () {
    return {
      // validation rules
      email: 'required|email',
      password: 'required'
    }
  }
}

module.exports = StoreUser
