'use strict'

const Model = use('Model')

class Store extends Model {
  branches() {
    return this.hasMany('App/Models/branch')
  }
}

module.exports = Store
