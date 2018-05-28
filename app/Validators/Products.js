'use strict'

class Products {
  get rules () {
    const products = this.ctx.request.post()

    if (products) {
      return {
        'products.*.name' : 'required|string',
        'products.*.quantity' : 'required|number',
        'products.*.unitprice' : 'required|number',
        'products.*.costprice' : 'required|number',
        'products.*.barcode' : 'required',
        'products.*.status': 'required|string'
      }
    }
    return {
      // validation rules
      'name' : 'required',
      'quantity' : 'required',
      'unitprice' : 'required',
      'costprice' : 'required',
      'barcode' : 'required',
      'status': 'required'
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
      'products.*.name.required': '{{ field }} is required to create a new product',
      'products.*.quantity.required': '{{ field }} is required to create a new product',
      'products.*.unitprice.required': '{{ field }} is required to create a new product',
      'products.*.costprice.required': '{{ field }} is required to create a new product',
      'products.*.barcode.required': '{{ field }} is required to create a new product',
      'products.*.status.required': '{{ field }} is required to create a new product',
      'products.*.quantity.number': '{{ field }} must be a number',
      'products.*.unitprice.number': '{{ field }} must be a number',
      'products.*.costprice.number': '{{ field }} must be a number',
    }

  }
}

module.exports = Products
