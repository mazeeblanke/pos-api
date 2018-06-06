'use strict'

const Openingcash = use('App/Models/Openingcash')
const { parseDateTime } = require('../../../utils/helper')

class OpeningcashController {
  async index ({ request, response}) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const page = reqData.page || 1
    const store_id = reqData.store_id
    const branch_id = reqData.branch_id
    const from_user = reqData.from_user
    const to_user = reqData.to_user
    const totime = reqData.totime
      ? parseDateTime(reqData.totime)
      : parseDateTime(Date.now())
    const fromtime = reqData.fromtime
      ? parseDateTime(reqData.fromtime)
      : parseDateTime('0001-01-01')

    let Builder =  Openingcash
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
      Builder = Builder.where('fromuser', from_user)
    }

    if (to_user) {
      Builder = Builder.where('touser', to_user)
    }


    const _openingcash = await Builder.paginate(page, limit)

    response.status(200).json({
      message: 'All Opening Cash',
      data: _openingcash
    })
  }

  async store ({ request, response}) {
    let openingcash = request.post().openingcash

    openingcash = openingcash.map((o) => ({
      store_id: o.store_id,
      branch_id: o.branch_id,
      amount: o.amount,
      from_user: o.from_user,
      to_user: o.to_user,
      details: o.details
    }))

    let _openingcash = await Openingcash.createMany(openingcash)

    _openingcash = _openingcash.map(e => e.id)

    const openingcashes = await Openingcash
    .query()
    .whereIn('id', _openingcash)
    .orderBy('id', 'desc')
    .with('fromuser')
    .with('touser')
    .with('store')
    .with('branch')
    .fetch()

    response.status(200).json({
      message: 'Successfully saved opening cash',
      data: openingcashes
    })
  }

  async update ({ request, response }) {
    let openingcash = await Openingcash.find(id)

    if(openingcash) {
      const {
        amount,
        from_user,
        to_user,
        details
      } = request.post()

      let payload = {
        amount,
        from_user,
        to_user,
        details
      }

      openingcash.merge(payload)

      await openingcash.save()


      response.status(200).json({
        message: 'Updated',
        data: openingcash
      })
    }

  }
}



module.exports = OpeningcashController
