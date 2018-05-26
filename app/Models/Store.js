'use strict'

const Model = use('Model')

class Store extends Model {
  getCurrency (currency) {
    if (! currency instanceof Object) {
      return JSON.parse(currency)
    }
    return currency
  }


  setTax (value) {
    if (value === undefined || value === null) {
      return JSON.stringify([{ type: "Value Added Tax (VAT)", value: 10 }]);
    } else {
      return value
    }
  }

  getTax (value) {
    if (value !== undefined) {
      return JSON.parse(value)
    }
  }

  branches() {
    return this.hasMany('App/Models/Branch')
  }
}

module.exports = Store
