'use strict'

const Model = use('Model')

class Store extends Model {
  // getCurrency (currency) {
  //   return JSON.parse(currency)
  // }

  branches() {
    return this.hasMany('App/Models/Branch')
  }
}

module.exports = Store
