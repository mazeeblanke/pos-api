'use strict'
const User = use('App/Models/User')
const Store = use('App/Models/Store')
const Branch = use('App/Models/Branch')

class SettingController {
  async index({ request, response, auth }) {
    let loggedInUser = await auth.getUser()
    const branch = await loggedInUser.branch().first()
    const store= await loggedInUser.store().first()
    response
      .status(200)
      .json({
        message: "successfully fetched settings!",
        payload: {
          loggedInUser,
          branch,
          store,
        }
      });
  }

  async create() {}

  async store() {

  }

  async show() {}

  async edit() {}

  async update({ request, response, auth}) {
    let loggedInUser = await auth.getUser()
    const { branch, store } = request.post()
    const _branch = await Branch.find(branch.id)
    const _store = await loggedInUser.store().first()

    _branch.merge(branch)
    _store.merge(store)

    await _branch.save()
    await _store.save()

    response.status(201).json({
      message: "Settings Added",
      data: {
        store: _store,
        branch: _branch
      }
    })

  }

  async destroy() {}
}

module.exports = SettingController
