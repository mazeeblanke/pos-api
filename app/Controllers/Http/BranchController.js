'use strict'

const Branch = use('App/Models/Branch')

;('use strict')

class BranchController {
  async index ({ request, response, auth }) {
    const loggedInUser = await auth.getUser()
    const store_id = loggedInUser.store_id
    const reqData = request.all()
    const limit = reqData.limit || 10
    const name = reqData.name || ''
    const page = reqData.page || 1
    const branches = await Branch.query()
      .where('store_id', store_id)
      .whereRaw(`lower("name") like lower('%${name}%')`)
      .orderBy('id', 'desc')
      .paginate(page, limit)

    response.status(200).json({
      message: 'successfully loaded branches !!',
      data: branches,
       meta: {
        limit,
        name,
        page,
        store_id
      }
    })
  }

  async create () {}

  async store ({ request, response, auth }) {
    const loggedInUser = await auth.getUser()
    const store_id = loggedInUser.store_id
    const { branches } = request.post()
    let data;

    if (branches) {
      data = await Branch.createMany(branches)
    }

    if (!branches) {
      data = await Branch.create({
        ...request.only([
          'name',
          'email',
          'address',
          'currency',
          'receiptinfo',
          'printout',
          'discount',
          'threshold'
        ]),
        store_id
      })
    }

    response.status(200).json({
      message: 'Successfully created branch !!',
      data: data
    })
  }

  async show ({ params: { id }, response }) {
    const branch = await Branch.find(id)
    if (branch) {
      response.status(200).json({
        message: 'Successfully loaded branch !!',
        data: branch
      })
    } else {
      response.status(404).json({
        message: 'branch not found!',
        id
      })
    }
  }

  async edit () {}

  async update ({ params: { id }, response, request }) {
    let branch = await Branch.find(id)
    let updated

    if (branch) {
      branch.merge(
        request.only([
          'name',
          'email',
          'address',
          'currency',
          'receiptinfo',
          'printout',
          'discount',
          'threshold'
        ])
      )

      if (updated = await branch.save()) {
        response.status(200).json({
          message: 'Successfully updated branch details',
          data: branch
        })
      } else {
        response.status(404).json({
          message: 'Unable to update branch details',
          data: branch
        })
      }
    } else {
      response.status(404).json({
        message: 'Branch not found',
        id
      })
    }
  }

  async destroy () {}
}

module.exports = BranchController
