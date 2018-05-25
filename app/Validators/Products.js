'use strict'

class Products {
  get rules () {
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
    return this.ctx.response.send(errorMessages)
  }

  get messages() {
    return {

    }

  }
}

module.exports = Products
