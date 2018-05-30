'use strict'

const Model = use('Model')

class Branch extends Model {

  setPrintout (value) {
    return value || 'receipt'
  }

  setThreshold (threshold) {
    return threshold || 0
  }

  setDiscount (discount) {
    return discount || 0
  }

  setReceiptinfo (receiptinfo) {
    return receiptinfo || ''
  }

  store() {
    return this.belongsTo('App/Models/Store', 'store_id')
  }

}

module.exports = Branch
