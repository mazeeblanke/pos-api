'use strict'

class StoreUser {
  get rules () {

    const users = this.ctx.request.post()

    if (users) {
      return {
        'users.*.full_name' : 'required|string',
        'users.*.email' : 'required|email|unique:users,email',
        'users.*.password' : 'required|string',
        'users.*.access_level' : 'required|string',
        'users.*.username' : 'required|string',
        'users.*.status' : 'required|string'
      }
    }

    return {
      // validation rules
      email: 'required|email',
      password: 'required'
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

  get messages() {
    return {
      'users.*.name.required': '{{ field }} is required to create a new user',
      'users.*.email.required': '{{ field }} is required to create a new user',
      'users.*.email.email': '{{ field }} must be a valid email',
      'users.*.address.required': '{{ field }} is required to create a new user',
      'users.*.currency.required': '{{ field }} is required to create a new user',
      'users.*.printout.required': '{{ field }} is required to create a new user',
      'users.*.address.string': '{{ field }} must be a string',
      'users.*.printout.string': '{{ field }} must be a string'
    }

  }

}

module.exports = StoreUser
