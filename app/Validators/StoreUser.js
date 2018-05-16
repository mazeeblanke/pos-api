'use strict'

class StoreUser {
  get rules () {
    return {
      // validation rules
      email: 'required|email|unique:users',
      password: 'required'
    }
  }
}

module.exports = StoreUser
