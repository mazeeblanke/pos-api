'use strict'

const Bankingcash = use('App/Models/Bankingcash')

class BankingcashController {
  async index ({ request, response}) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const page = request.limit || 1
    const store_id = reqData.store_id || ''
    const branch_id = reqData.branch_id || ''
    const from_user = reqData.from_user || ''
    const to_user = reqData.to_user || ''

    let bankingcash =  Bankingcash.query()

    if (store_id) {
      bankingcash = bankingcash.where('store_id', store_id)
    }

    if (branch_id) {
      bankingcash = bankingcash.where('branch_id', branch_id).with('store')
    }

    if (from_user) {
      bankingcash = bankingcash.where('user_id', from_user).with('branch')
    }

    const _bankingcash = await bankingcash.paginate(page, limit)

    response.status(200).json({
      message: 'All Banking Cash',
      _bankingcash
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

    response.status(200).json({
      message: 'All Open Cash!',
      _bankingcash
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

module.exports = BankingcashController
