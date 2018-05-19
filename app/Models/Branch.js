'use strict'

const Model = use('Model')

class Branch extends Model {

  getCurrency (currency) {
    return JSON.parse(currency)
  }

  store() {
    return this.belongsTo('App/Models/Store', 'store_id')
  }
}

module.exports = Branch
