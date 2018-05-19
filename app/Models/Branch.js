'use strict'

const Model = use('Model')

class Branch extends Model {

  getCurrency (currency) {
    console.log(currency)
    if (! currency instanceof Object) {
      return JSON.parse(currency)
    }
    return currency
  }

  store() {
    return this.belongsTo('App/Models/Store', 'store_id')
  }
}

module.exports = Branch
