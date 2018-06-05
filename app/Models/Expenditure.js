'use strict'

const Model = use('Model')

class Expenditure extends Model {
  static get table() {
    return 'expenditures'
  }
}

module.exports = Expenditure
