'use strict'

const Sale = use('App/Models/Sale')
const Customer_Orders = use('App/Models/CustomerOrder')
const SaleDetail = use('App/Models/SaleDetail')
const Branch_inventory = use('App/Models/ProductsBranch')

class SaleController {
  async index ({ response }) {
    const sales = await Sale.all()

    response.status(200).json({
      message: 'All Sales Transactions',
      data: sales
    })
  }

  async create () {}

  async store ({ response, request, auth }) {
    let loggedInUser = await auth.getUser()

    let user_id = loggedInUser.id

    let {
      amountPaid,
      total,
      cashChange,
      subTotal,
      discountTotal,
      discount_per_threshold,
      taxTotal,
      branch_id,
      store_id,
      customer_id,
      sales_id,
      threshold,
      tax,
      payment_type,
      products,
      discount,
      customer
    } = request.post()

    const _SaleDetail = await SaleDetail.create({
      sales_id,
      user_id,
      tax,
      discount,
      branch_id,
      threshold,
      discount_per_threshold,
      store_id,
      payment_type,
      amount_paid: amountPaid,
      total
    })

    products = products
      .map(p => {
        if (!p) return
        let {
          id: product_id,
          name,
          unitprice: unit_price,
          quantity,
          subTotal: sub_total
        } = p

        return {
          sales_id,
          user_id,
          product_id,
          store_id,
          branch_id,
          unit_price,
          quantity,
          payment_type,
          sale_details_id: _SaleDetail.id,
          sub_total
        }
      })
      .filter(p => p)


    for (let item of products) {
      const product_branch = await Branch_inventory.query()
        .where('branch_id', item.branch_id)
        .where('product_id', item.product_id)
        .first()

      product_branch.quantity =
        parseInt(product_branch.quantity) - parseInt(item.quantity)

      await product_branch.save()
    }

    const _products = await Sale.createMany(products)

    if (customer_id) {
      const cust_ord = await Customer_Orders.create({
        customer_id,
        sale_details_id: _SaleDetail.id,
        gross: total
      })
      response.status(200).json({
        message: 'Successfully added Customer sales.',
        cust_ord,
        _products
      })
    } else {
      response.status(200).json({
        message: 'Successfully added sales record.',
        _products
      })
    }
  }

  async show ({ response, params: { id } }) {
    let builder = await Sale.query()
      .where('id', id)
      .with('customerOrder.customer')
      .with('product')
      .first()
    response.status(200).json({
      message: 'Successfully fetched sales history',
      data: builder
    })
  }

  async edit () {}

  async update () {}

  async destroy () {}
}

module.exports = SaleController
