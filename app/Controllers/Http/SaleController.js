'use strict'

const Sales = use('App/Models/Sale')
const Customer_Orders = use('App/Models/CustomerOrder')
const SaleDetail = use('App/Models/SaleDetail')
// const Store_inventory = use('App/Models/Product')
// const Branch_inventory = use('App/Models/ProductsBranch')


class SaleController {
  async index ({ response }) {
    const sales = await Sales.all()

    response.status(200).json({
      message: 'All Sales Transactions',
      data: sales
    })
  }

  async create () {
  }

  async store ({ response, request, auth }) {
    let loggedInUser = await auth.getUser()
    let user_id = loggedInUser.id

    let { 
      amountPaid,
      total,
      cashChange,
      subTotal,
      discountTotal,
      taxTotal,
      branch_id,
      store_id,
      customer_id, 
      sales_id, 
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
      store_id,
      payment_type,
      amount_paid: amountPaid,
      total
    })

    products = products
    .map((p) => {
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

    const _products = await Sales.createMany(products)

    if (customer_id) {
      const cust_ord = await Customer_Orders.create({ customer_id, sale_details_id: _SaleDetail.id, gross: total })
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

  async show ({ response, params: { id }}) {
    const sale = await Sales.query().where({sales_id:id})

    if (sale.length) {
      response.status(200).json({
        message: 'Single Sale Transaction',
        data: sale
      })
    } else {
      response.status(404).json({
        message: 'sale record not found!',
        id
      })
    }
  }

  async edit () {
  }

  async update () {
  }

  async destroy () {
  }

}

module.exports = SaleController
