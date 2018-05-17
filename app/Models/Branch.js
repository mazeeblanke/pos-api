'use strict'

const Model = use('Model')

class Branch extends Model {
  store() {
    return this.belongsTo('App/Models/Store', 'store_id')
  }
}

module.exports = Branch
