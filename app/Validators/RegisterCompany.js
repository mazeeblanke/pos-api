'use strict'

// const indicative = require('indicative')


class Register {
  get rules() {
    return {
      // validation rules
      'user.email': 'required|email',
      'user.password': 'required',
      'user.full_name': 'required',
      // 'user.access_level': 'required',
      // user.status: 'required',
      // user.username: 'required'

      // branches: [{
      //   email: 'required|email',
      //   name: 'required',
      //   address: 'required'
      // }],

      // 'store.name': 'required',
      // 'store.email': 'required',
      // user: 'required',
      // store: 'required',
      // branches: 'required',
      // paymentPlan: 'required'
      // store: {
      //   name: 'required',
      //   email: 'required|email'
      // }
    }
  }

  get validateAll () {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages)
  }

  get messages () {
    return {
      'user.email.required': 'hshd sdhs dsd hsdshd',
      'user.email.email': 'wej shakalaka boom'
    }

  }

}

module.exports = Register
