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
      return JSON.stringify(value)
    }
  }

  getTax (value) {
    console.log('in herre')
    console.log(value)
    // console.log(JSON.parse(value))
    if (typeof value === "string") {
      return JSON.parse(value)
    }
    return value
  }

  branches() {
    return this.hasMany('App/Models/Branch')
  }
}

module.exports = Store
