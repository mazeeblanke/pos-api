'use strict'

const Sale = use('App/Models/Sale')
const { parseDateTime } = require('../../../utils/helper')

class ProfitlossController {
  async index ({ request, response}) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const page = reqData.page || 1
    const store_id = reqData.store_id
    const branch_id = reqData.branch_id
    const from_time = reqData.from_time ? parseDateTime(reqData.from_time)  : parseDateTime('0001-01-01')
    const to_time = reqData.to_time ? parseDateTime(reqData.to_time) : parseDateTime(Date.now())

    let builder = Sale
    .query()
    .orderBy('id', 'desc')
    .whereBetween('created_at', [from_time, to_time])

    if (store_id) {
      builder = builder.where('store_id', store_id)
    }

    if (branch_id) {
      builder = builder.where('branch_id', branch_id)
    }

    const _sales = await builder.paginate(page, limit)
    let total_unitprice = 0
    let total_costprice = 0
    _sales.toJSON().data.forEach(prd => {
      total_unitprice += prd.unit_price
      total_costprice += prd.costprice
    })

    let total_profitloss = total_unitprice - total_costprice

    response.status(200).json({
      message: 'Sales Total',
      data: _sales,
      total_profitloss: total_profitloss
    })

  }
}

module.exports = ProfitlossController

// go through all sales

// go throiuhg original price

// add threshold
