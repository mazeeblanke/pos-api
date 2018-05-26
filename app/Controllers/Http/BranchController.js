'use strict'

const Branch = use('App/Models/Branch')

;('use strict')

class BranchController {
  async index ({ request, response, auth }) {
    const loggedInUser = await auth.getUser()
    const store_id = loggedInUser.store_id
    const reqData = request.all()
    const limit = reqData.limit || 10
    const name = reqData.namae || ''
    const page = reqData.page || 1
    const branches = await Branch.query()
      .where('store_id', store_id)
      .whereRaw(`lower("name") like lower('%${name}%')`)
      .paginate(page, limit)

    response.status(200).json({
      message: 'All Branch',
      branches
    })
  }

  async create () {}

  async store () {}

  async show () {}

  async edit () {}

  async update () {}

  async destroy () {}
}

module.exports = BranchController
