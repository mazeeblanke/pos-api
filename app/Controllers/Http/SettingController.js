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
    const { branch_new, store_new } = request.post()
    const branch_old = await loggedInUser.branch().first()
    const store_old = await loggedInUser.store().first()

    branch_old.name = branch_new.name
    branch_old.email = branch_new.email
    branch_old.address = branch_new.address
    branch_old.receiptinfo = branch_new.receiptinfo
    branch_old.currency = JSON.stringify(branch_new.currency)
    branch_old.printout = branch_new.printout
    branch_old.threshold = branch_new.threshold
    branch_old.discount = branch_new.discount

    store_old.name = store_new.name
    store_old.email = store_new.email
    store_old.tax = JSON.stringify(store_new.tax)
    store_old.phone = store_new.phone
    store_old.currency = JSON.stringify(store_new.currency)

    await branch_old.save()
    await store_old.save()

    response.status(201).json({
      message: "Settings Added",
      payload: {
        store_old,
        branch_old
      }
    })

  }

  async destroy() {}
}

module.exports = SettingController
