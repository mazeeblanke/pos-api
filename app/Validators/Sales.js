'use strict'

class Sales {
  get rules() {
    return {
      // validation rules

      'sales_id': 'required',
      'products.*.id': 'required',
      'products.*.name': 'required',
      'products.*.quantity': 'required',
      'products.*.unitprice': 'required',
      'products.*.costprice': 'required',
      'products.*.barcode': 'required',
      'products.*.status': 'required',
      'products.*.quantityInStock': 'required',
      'products.*.branch.id': 'required',
      'products.*.branch.email': 'required|email',
      'products.*.branch.name': "required",
      'products.*.branch.address': "required",
      'products.*.branch.store_id': 'required',
      'products.*.branch.receiptinfo': 'required',
      'products.*.branch.currency': 'required',
      'products.*.branch.printout': 'required',
      'products.*.branch.threshold': 'required',
      'products.*.branch.discount': 'required',
      'products.*.branch.branch_id': 'required',
      'products.*.branch.product_id': 'required',
      'products.*.branch.quantity': 'required',
      'products.*.store_id': 'required',
      'products.*.subTotal': 'required',

      'tax': 'required',
      'payment_type': 'required',
      'discount': 'required',
      'customer': 'required',
      'amountPaid': 'required',
      'cashChange': 'required',
      'loyalty': 'required',
      'total': 'required',
      'subTotal': 'required',
      'availableDiscount': 'required',
      'customerDetails': 'required',
      'discountTotal': 'required',
      'taxTotal': 'required',
      'branch_id': 'required',
      'store_id': 'required',

    }
  }


  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages)
  }

  get messages() {
    return {

    }

  }
}

module.exports = Sales
