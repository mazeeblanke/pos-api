'use strict'

const Sales = use('App/Models/Sale')
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

  async store ({ response, request }) {
    const { branch_id, sales_id, product_id, user_id, unit_price, quantity, total, salestime, discount, tax} =  request.post()
    const sale = await Sales.create({ branch_id, sales_id, product_id, user_id, unit_price, quantity, total, salestime, discount, tax})

    response.status(201).json({
      message: 'Successfully added sales.',
      data: sale
    })

  }

  async show ({ response, params: { id }}) {
    const sale = await Sales.find(id)

    if (sale) {
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
