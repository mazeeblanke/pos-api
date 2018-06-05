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
  multiplyCash ,
  subtractCash,
  calculateDiscount
} = require('../../../utils/helper')

class RefundController {

  async index ({ request, response }) {
    const reqData = request.all()
    const limit = reqData.limit || 10
    const page = reqData.page || 1
    const branch_id = reqData.branch_id
    const user_id = reqData.user_id
    const product_id = reqData.product_id
    const from = reqData.from
    const to = reqData.to
    let builder = Refund.query()
      .with('product')
      .with('branch')
      .with('user')
      .with('customerOrder.customer')
    

    if (product_id) {
      builder = builder.whereHas('product', (builder) => {
        builder.where('id', product_id)
      })
    }

    if (branch_id) {
      builder = builder.whereHas('branch', (builder) => {
        builder.where('id', branch_id)
      })
    }

    if (user_id) {
      builder = builder.whereHas('user', (builder) => {
        builder.where('id', user_id)
      })
    }

    const refunds = await builder.paginate(page, limit)

    response.status(200).json({
      message: 'All Refunds',
      data: refunds
    })
  }

  async store ({ response, request }) {

    const trx = await Database.beginTransaction()

    const { 
      store_id, 
      branch_id, 
      sales_id, 
      products 
    } = request.post()

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

      sales_item.quantity = subtractCash(
        +original_quantity,
        +product.quantity
      )

      sales_item.sub_total = multiplyCash(
        +sales_item.unit_price, 
        +sales_item.quantity
      )

      const amountToRefund = multiplyCash(
        +product.quantity, 
        +sales_item.unit_price
      )  

      totalAmountToRefund += +amountToRefund

      await sales_item.save(trx)

      const branch_inventory = await BranchInventory.query()
        .where('branch_id', branch_id)
        .where('product_id', product.id)
        .first()

      branch_inventory.quantity = sumCash([
        +branch_inventory.quantity,
        +product.quantity
      ])

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
          amount_refunded: amountToRefund,
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

    const discountInCash = calculatePercentInCash(
      _saleDetail.discount,
      sub_total
    )

    const taxInCash = calculatePercentInCash(
      _saleDetail.tax, 
      sub_total
    )

    
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
