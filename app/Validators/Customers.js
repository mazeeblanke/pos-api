'use strict'

class Customers {
  get rules() {
    const customers = this.ctx.request.post()

    if (customers) {
      return {
        'customers.*.full_name' : 'required|string',
        'customers.*.email' : 'required|email|unique:customers,email',
        'customers.*.address' : 'required|string',
        'customers.*.marital_status' : 'required',
        'customers.*.store_id' : 'required',
        'customers.*.gender' : 'required',
        // 'customers.*.country' : 'required',
        'customers.*.phone' : 'required',
      }
    }

    return {
      // validation rules
      'full_name': 'required|string',
      'phone': 'required|string',
      'gender': 'required',
      'marital_status': 'required',
      'email': 'required|email|unique:customers,email',
      'address': 'required',
      'country': 'required',
      'store_id': 'required'
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
      'customers.*.full_name.required': '{{ field }} is required to create a new customer',
      'customers.*.email.required': '{{ field }} is required to create a new customer',
      'customers.*.email.email': '{{ field }} must be a valid email',
      'customers.*.address.required': '{{ field }} is required to create a new customer',
      'customers.*.marital_status.required': '{{ field }} is required to create a new customer',
      'customers.*.gender.required': '{{ field }} is required to create a new customer',
      'customers.*.phone.required': '{{ field }} is required to create a new customer',
      'customers.*.address.string': '{{ field }} must be a string',
      'customers.*.phone.string': '{{ field }} must be a string'
    }
  }



}

module.exports = Customers
