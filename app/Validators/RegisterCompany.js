'use strict'

// const indicative = require('indicative')


class Register {
  get rules() {
    return {
      // validation rules

      //USER
      'user.email': 'required|email',
      'user.password': 'required',
      'user.full_name': 'required',
      'user.access_level': 'required',
      'user.status': 'required',
      'user.username': 'required',

      //BRANCHES
      'branches.*.email': 'required|email',
      'branches.*.name': 'required',
      'branches.*.address': 'required',
      'branches.*.currency.name': 'required',

      'paymentPlan': 'required',

      //STORE
      'store.name': 'required',
      'store.email': 'required|email',
      'store.currency.name': 'required'
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages)
  }

  get messages() {
    return {
      //USER
      'user.email.required': '{{ field }} is required to create a new account',
      'user.email.email': 'Enter a valid email address.',
      'user.password.required': '{{ field }} is required to create a new account',
      'user.full_name.required': '{{ field }} is required to create a new account',
      'user.access_level.required': '{{ field }} is required to create a new account',
      'user.status.required': '{{ field }} is required to create a new account',
      'user.username.required': 'Please choose a unique username for your account'

      //BRANCH
    }

  }

}

module.exports = Register
