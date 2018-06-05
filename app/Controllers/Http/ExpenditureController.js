'use strict'

const Expenditure = use('App/Models/Expenditure')

class ExpenditureController {
  async index ({ request, response}) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const page = request.limit || 1
    const store_id = reqData.store_id || ''
    const branch_id = reqData.branch_id || ''
    const user_id = reqData.user_id || ''

    let expenditures =  Expenditure.query()

    if (store_id) {
      expenditures = expenditures.where('store_id', store_id)
    }

    if (branch_id) {
      expenditures = expenditures.where('branch_id', branch_id).with('store')
    }

    if (user_id) {
      expenditures = expenditures.where('user_id', user_id).with('branch')
    }

    const _expenditure = await expenditures.paginate(page, limit)

    response.status(200).json({
      message: 'All Expenditures',
      _expenditure
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

    response.status(200).json({
      message: 'Expenditure Recorded!',
      _expenditure
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
