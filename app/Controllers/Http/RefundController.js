'use strict'

const Sale = use('App/Models/Sale')
const CustomerOrder = use('App/Models/CustomerOrder')
const SaleDetail = use('App/Models/SaleDetail')
const BranchInventory = use('App/Models/ProductsBranch')
const Refund = use('App/Models/Refund')
const Branch = use('App/Models/Branch')
const Database = use('Database')
const {
  calculatePercentInCash,
  calcSubTotal,
  sumCash,
  calculateDiscount
} = require('../../../utils/helper')

class RefundController {
  async index ({ request, response }) {
    const reqData = request.all()
    const limit = reqData.limit || 10
    const page = reqData.page || 1
    const refunds = await Refund.query().paginate(page, limit)

    response.status(200).json({
      message: 'All Refunds',
      refunds
    })
  }

  async store ({ response, request }) {
    const trx = await Database.beginTransaction()
    const { store_id, branch_id, sales_id, products } = request.post()
    const Sales = []
    let totalAmountToRefund = 0

    for (let product of products) {
      const sales_item = await Sale.query()
        .where('store_id', store_id)
        .where('branch_id', branch_id)
        .where('sales_id', sales_id)
        .where('product_id', product.id)
        .first()

      let original_quantity = sales_item.quantity

      sales_item.quantity = original_quantity - parseInt(product.quantity)

      sales_item.sub_total =
        parseFloat(sales_item.unit_price) * parseInt(sales_item.quantity)

      totalAmountToRefund =
        totalAmountToRefund +
        (parseInt(product.quantity) + parseFloat(sales_item.unit_price))

      await sales_item.save(trx)

      const branch_inventory = await BranchInventory.query()
        .where('branch_id', branch_id)
        .where('product_id', product.id)
        .first()

      branch_inventory.quantity =
        parseInt(branch_inventory.quantity) + parseInt(product.quantity)
      await branch_inventory.save(trx)

      const refund = await Refund.create(
        {
          sale_id: sales_item.id,
          sale_details_id: sales_item.sale_details_id,
          product_id: sales_item.product_id,
          store_id: sales_item.store_id,
          branch_id: sales_item.branch_id,
          user_id: sales_item.user_id,
          quantity_ordered: original_quantity,
          quantity_returned: product.quantity,
          unit_price: product.unitprice
        },
        trx
      )

      Sales.push(sales_item.toJSON())
    }

    const _saleDetail = await SaleDetail.query()
      .where('sales_id', sales_id)
      .first()

    const sub_total = calcSubTotal(Sales)

    _saleDetail.discount = calculateDiscount(
      sub_total,
      _saleDetail.threshold,
      _saleDetail.discount_per_threshold
    )

    const discountInCash = calculatePercentInCash(_saleDetail.discount, sub_total)

    const taxInCash = calculatePercentInCash(_saleDetail.tax, sub_total)

    _saleDetail.total = Math.max(
      sumCash([sub_total, -discountInCash, taxInCash]),
      0
    )

    await _saleDetail.save(trx)

    trx.commit()

    response.status(200).json({
      message: 'Succesfully refunded item(s)',
      data: {
        ..._saleDetail.toJSON(),
        totalAmountToRefund
      }
    })
  }
}

module.exports = RefundController
