'use strict'

const Openingcash = use('App/Models/Openingcash')

class OpeningcashController {
  async index ({ request, response}) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const page = request.limit || 1
    const store_id = reqData.store_id || ''
    const branch_id = reqData.branch_id || ''
    const from_user = reqData.from_user || ''
    const to_user = reqData.to_user || ''

    let openingcash =  Openingcash.query()

    if (store_id) {
      openingcash = openingcash.where('store_id', store_id)
    }

    if (branch_id) {
      openingcash = openingcash.where('branch_id', branch_id).with('store')
    }


    const _openingcash = await openingcash.paginate(page, limit)

    response.status(200).json({
      message: 'All Opening Cash',
      _openingcash
    })
  }

  async store ({ request, response}) {
    const openingcash = request.post().openingcash
    let _openingcash = []

    for (let opncash of openingcash) {
      const saved_opncash = await Openingcash.create({
        store_id: opncash.store_id,
        branch_id: opncash.branch_id,
        from_user: opncash.from_user,
        to_user: opncash.to_user,
        details: opncash.details
      })

      _openingcash.push(saved_opncash)
    }

    response.status(200).json({
      message: 'All Open Cash!',
      _openingcash
    })
  }
}



module.exports = OpeningcashController
