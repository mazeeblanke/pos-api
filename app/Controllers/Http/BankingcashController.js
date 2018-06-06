'use strict'

const Bankingcash = use('App/Models/Bankingcash')
const { parseDateTime } = require('../../../utils/helper')

class BankingcashController {
  async index ({ request, response}) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const page = reqData.page || 1
    const store_id = reqData.store_id
    const branch_id = reqData.branch_id
    const from_user = reqData.from_user
    const to_user = reqData.to_user
    const totime = reqData.totime ? parseDateTime(reqData.totime) : parseDateTime(Date.now())
    const fromtime = reqData.fromtime ? parseDateTime(reqData.fromtime)  : parseDateTime('0001-01-01')

    let Builder =  Bankingcash
    .query()
    .orderBy('id', 'desc')
    .with('fromuser')
    .with('touser')
    .with('store')
    .with('branch')
    .whereBetween('created_at', [fromtime, totime])

    if (store_id) {
      Builder = Builder.where('store_id', store_id)
    }

    if (branch_id) {
      Builder = Builder.where('branch_id', branch_id)
    }

    if (from_user) {
      Builder = Builder.where('from_user', from_user)
    }

    if (to_user) {
      Builder = Builder.where('to_user', to_user)
    }

    const _bankingcash = await Builder.paginate(page, limit)

    response.status(200).json({
      message: 'All Banking Cash',
      data: _bankingcash
    })
  }

  async create () {
  }

  async store ({request, response}) {
    const bankingcash = request.post().bankingcash
    let _bankingcash = []

    for (let bnkcash of bankingcash) {
      const saved_bnkcash = await Bankingcash.create({
        store_id: bnkcash.store_id,
        branch_id: bnkcash.branch_id,
        from_user: bnkcash.from_user,
        to_user: bnkcash.to_user,
        amount: bnkcash.amount,
        bank: bnkcash.bank,
        details: bnkcash.details
      })

      _bankingcash.push(saved_bnkcash)
    }

    _bankingcash = _bankingcash.map(e => e.id)

    const Bankingcashes = await Bankingcash
    .query()
    .whereIn('id', _bankingcash)
    .orderBy('id', 'desc')
    .with('fromuser')
    .with('touser')
    .with('store')
    .with('branch')
    .fetch()

    response.status(200).json({
      message: 'successfully saved banking cash',
      data: Bankingcashes
    })
  }

  async show () {
  }

  async edit () {
  }

  async update ({ params: { id }, response, request}) {
    let bankingcash = await Bankingcash.find(id)

    if (bankingcash) {
      const {
        from_user,
        to_user,
        amount,
        bank,
        details
      } = request.post()

      let payload = {
        from_user,
        to_user,
        amount,
        bank,
        details
      }

      bankingcash.merge(payload)

      await bankingcash.save()

      response.status(200).json({
        message: 'Updated',
        data: bankingcash
      })
    }

  }

  async destroy () {
  }
}

module.exports = BankingcashController
