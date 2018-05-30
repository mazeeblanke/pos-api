'use strict'

const Model = use('Model')

class SaleDetail extends Model {

  user () {
    return this.belongsTo('App/Models/User', 'user_id')
  }

}

module.exports = SaleDetail
