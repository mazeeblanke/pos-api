'use strict'

const Model = use('Model')

class Refund extends Model {
  static get table() {
    return 'refund'
  }
}

module.exports = Refund
