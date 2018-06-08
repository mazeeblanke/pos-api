'use strict'

const Expenditure = use('App/Models/Expenditure')
const { parseDateTime } = require('../../../utils/helper')

class ExpenditureController {
  constructor () {
    this.rawFilters = [
      'type',
      'title',
      'amount'
    ]
  }

  async index ({ request, response}) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const page = reqData.page || 1
    const store_id = reqData.store_id
    const branch_id = reqData.branch_id
    const user_id = reqData.user_id
    const type = reqData.type
    const title = reqData.title
    const amount = reqData.amount
    const totime = reqData.totime 
      ? parseDateTime(reqData.totime) 
      : parseDateTime(Date.now())
    const fromtime = reqData.fromtime 
      ? parseDateTime(reqData.fromtime) 
      : parseDateTime('0001-01-01')

    let builder =  Expenditure
    .query()
    .orderBy('id', 'desc')
    .with('user')
    .with('store')
    .with('branch')
    .whereBetween('created_at', [fromtime, totime])

    this.rawFilters.forEach(filter => {
      if (reqData[filter]) {
        builder = builder.whereRaw(`LOWER(${filter}) LIKE LOWER('%${reqData[filter]}%')`)
      }
    })

    if (store_id) {
      builder = builder.where('store_id', store_id)
    }

    if (branch_id) {
      builder = builder.where('branch_id', branch_id)
    }

    if (user_id) {
      builder = builder.where('user_id', user_id)
    }

    const _expenditure = await builder.paginate(page, limit)

    response.status(200).json({
      message: 'All Expenditures',
      data: _expenditure,
      meta: {
        limit,
        page,
        branch_id,
        title,
        amount,
        type,
        totime,
        fromtime,
        store_id
      }
    })

  }

  async create () {
  }

  async store ({ request, response}) {
    const expenditure = request.post().expenditure
    let _expenditure = []

    for (let expd of expenditure) {
      const saved_expd = await Expenditure.create({
        store_id: expd.store_id,
        branch_id: expd.branch_id,
        user_id: expd.user_id,
        type: expd.type,
        title: expd.title,
        amount: expd.amount,
        details: expd.details
      })

      _expenditure.push(saved_expd)
    }

    _expenditure = _expenditure.map(e => e.id)

    const expenditures = await Expenditure
    .query()
    .whereIn('id', _expenditure)
    .orderBy('id', 'desc')
    .with('user')
    .with('store')
    .with('branch')
    .fetch()

    response.status(200).json({
      message: 'Expenditure Recorded!',
      data: expenditures
    })
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

module.exports = ExpenditureController
