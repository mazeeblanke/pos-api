'use strict'

const Model = use('Model')

class ProductInquiry extends Model {
  static get table() {
    return 'product_inquiries'
  }
}

module.exports = ProductInquiry
