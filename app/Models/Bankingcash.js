'use strict'

const Model = use('Model')

class Bankingcash extends Model {
  static get table() {
    return 'bankingcashes'
  }
}

module.exports = Bankingcash
