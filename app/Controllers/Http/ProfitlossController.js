'use strict'

const Sale = use('App/Models/Sale')
const Expenditure = use('App/Models/Expenditure')
const Openingcash = use('App/Models/Openingcash')
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
    let total_profit = 0
    let total_subtotal = 0

    _sales.toJSON().data.forEach(prd => {
      total_unitprice += parseFloat(prd.unit_price)
      total_costprice += parseFloat(prd.cost_price)
      total_profit += parseFloat(prd.profit)
      total_subtotal += parseFloat(prd.sub_total)
    })

    const expenditure = await Expenditure
      .query()
      .orderBy('id', 'desc')
      .where('store_id',store_id)
      .where('branch_id', branch_id)
      .whereBetween('created_at', [from_time, to_time]);

    const openingcash = await Openingcash
      .query()
      .orderBy('id', 'desc')
      .where('store_id',store_id)
      .where('branch_id', branch_id)
      .whereBetween('created_at', [from_time, to_time]);

    let total_expenditure = 0
    expenditure.forEach( element => {
      total_expenditure += parseFloat(element.amount)
    })

    let total_openingcash = 0
    openingcash.forEach( element => {
      total_openingcash += parseFloat(element.amount)
    })

    let total_profitloss = (total_profit + total_openingcash) - parseFloat(total_expenditure)

    response.status(200).json({
      message: 'Sales Total',
      total_unitprice: total_unitprice,
      total_profit: total_profit,
      total_subtotal: total_subtotal,
      total_costprice: total_costprice,
      total_profitloss: total_profitloss,
      total_expenditure: total_expenditure,
      total_openingcash: total_openingcash,
      expenditure: expenditure

    })

  }
}

module.exports = ProfitlossController
