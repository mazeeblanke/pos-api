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
    if (typeof value === "string") {
      return JSON.parse(value)
    }
    return value
  }

  productBranches () {
    return this.hasMany('App/Models/ProductsBranch', 'id')
  }

  branches() {
    return this.hasMany('App/Models/Branch')
  }
}

module.exports = Store
