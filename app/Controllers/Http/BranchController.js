'use strict'

const Branch = use('App/Models/Branch')

'use strict'


class BranchController {
  async index ({ request, response }) {
    const reqData = request.all()
    const limit = reqData.limit || 10
    const name = reqData.namae || ''
    const page = reqData.page || 1
    const branchs = await Branch.query().where('name','like',`%${name}%`).paginate(page, limit)
    console.log(reqData)

    response.status(200).json({
      message: 'All Branch',
      branchs
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

module.exports = BranchController
