'use strict'

const Sales = use('App/Models/Sale')
const Customer_Orders = use('App/Models/CustomerOrder')
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
    // const { branch_id, sales_id, product_id, user_id, unit_price, quantity, total, salestime, discount, tax} =  request.post()
    // const sale = await Sales.create({ branch_id, sales_id, product_id, user_id, unit_price, quantity, total, salestime, discount, tax})
      let user_id = loggedInUser.id
      let branch_id = loggedInUser.branch_id
      let store_id = loggedInUser.store_id
      let sales_record = []
      const { customer_id, sales_id, tax, products, discount, customer } = request.post()
      console.log(customer_id)
      let total
      for (let product of products) {
      var { product_id, name, unit_price, quantity } = product
      total = unit_price * quantity
      const sale = await Sales.create({ branch_id, sales_id, product_id, user_id, unit_price, quantity, total, discount, tax })
      sales_record.push(sale)
    }


    if (customer_id) {
      const gross = await request.post().total
      const cust_ord = await Customer_Orders.create({ customer_id, sales_id, gross })
      response.status(201).json({
        message: 'Successfully added Customer sales.',
        cust_ord,
        sales_record
      })
    } else {
      response.status(201).json({
        message: 'Successfully added sales record.',
        sales_record
      })
    }
  }

  async show ({ response, params: { id }}) {
    // const sale = await Sales.find(id)
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
