'use strict'

class Register {
  get rules() {
    return {
      // validation rules
      // user: {
      //   email: 'required|email',
      //   password: 'required',
      //   full_name: 'required',
      //   access_level: 'required',
      //   status: 'required',
      //   username: 'required'
      // },

      // branches: [{
      //   email: 'required|email',
      //   name: 'required',
      //   address: 'required'
      // }],

      // 'store.name': 'required',
      // 'store.email': 'required',
      user: 'required',
      store: 'required',
      branches: 'required',
      paymentPlan: 'required'
      // store: {
      //   name: 'required',
      //   email: 'required|email'
      // }
    }
  }
}

module.exports = Register
