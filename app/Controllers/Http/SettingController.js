'use strict'
const User = use('App/Models/User')

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

  async store() {}

  async show() {}

  async edit() {}

  async update() {}

  async destroy() {}
}

module.exports = SettingController
