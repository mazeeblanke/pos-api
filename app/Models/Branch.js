'use strict'

const Model = use('Model')

class Branch extends Model {

  getCurrency (currency) {
    if (! currency instanceof Object) {
      return JSON.parse(currency)
    }
    return currency
  }

  setPrintout (value) {
    if (value === undefined) {
      return 'receipt'
    } else {
      return value
    }
  }

  store() {
    return this.belongsTo('App/Models/Store', 'store_id')
  }
}

module.exports = Branch
