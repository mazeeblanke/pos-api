'use strict'

const User = use('App/Models/User')
const Customer = use('App/Models/Customer')
const Product = use('App/Models/Product')
const Sale = use('App/Models/Sale')

class DashboardController {
  async index () {
  }

  async stats ({ request, response, auth }) {
    let loggedInUser = await auth.getUser()
    loggedInUser = await User.query().where('id', loggedInUser.id).with('branch').with('store').first()

    loggedInUser = loggedInUser.toJSON()

    let userCount = await User
    .query()
    .where('store_id', loggedInUser.store.id)
    .getCount()

    let customerCount = await Customer
    .query()
    .where('store_id', loggedInUser.store.id)
    .getCount()

    let productCount = await Product
    .query()
    .where('store_id', loggedInUser.store.id)
    .getCount()

    let saleCount = await Sale
    .query()
    .where('store_id', loggedInUser.store.id)
    .getCount()


    response.status(200).json({
      message: 'Successfully loaded stats !!',
      data: {
        customerCount,
        productCount,
        saleCount,
        userCount
      }
    })

    
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

module.exports = DashboardController
