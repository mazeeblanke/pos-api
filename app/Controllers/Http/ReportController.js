'use strict'

const Sale = use('App/Models/Sale')
const SaleDetail = use('App/Models/SaleDetail')
const { parseDateTime } = require('../../../utils/helper')

class ReportController {

  async index ({ request, response }) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const store_id = reqData.store_id
    const branch_id = reqData.branch_id
    const direction = reqData.direction || 'desc'
    const type = reqData.type || 'quantity'
    const report_type = reqData.report_type
    const totime = reqData.totime
      ? parseDateTime(reqData.totime)
      : parseDateTime("4000-04-12")
    const fromtime = reqData.fromtime
      ? parseDateTime(reqData.fromtime)
      : parseDateTime('0001-01-01')
    let Builder;  

    if (report_type === 'product') {
      Builder = Sale
      .query()
      .with('user')
      .with('refund')
      .with('product')
      .with('store')
      .with('branch')
      .whereBetween('created_at', [fromtime, totime])
      .where('branch_id', branch_id)
      .where('store_id', store_id)
      .orderBy(type, direction)
      .limit(limit)

    }

    const Results = await Builder.fetch()
    
    response.status(200).json({
      message: 'Successfully fetched results',
      data: Results,
      meta: {
        direction,
        type,
        report_type,
        totime,
        fromtime,
        limit
      }
    })

  }

  async create () {
  }

  async store () {
  }

  async show () {
  }

  async edit () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = ReportController
