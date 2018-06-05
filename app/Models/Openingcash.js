'use strict'

const Model = use('Model')

class Openingcash extends Model {
  static get table() {
    return 'openingcashes'
  }
}

module.exports = Openingcash
