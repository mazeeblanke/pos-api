'use strict'

class Customers {
  get rules() {
    return {
      // validation rules
      'full_name': 'required',
      'phone': 'required',
      'gender': 'required',
      'marital_status': 'required',
      'email': 'required|email',
      'address': 'required',
      // 'city': 'required',
      'country': 'required',
      // 'postalcode': 'required',
      // 'cardnumber': 'required',
      'store_id': 'required'
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

    }
  }



}

module.exports = Customers
