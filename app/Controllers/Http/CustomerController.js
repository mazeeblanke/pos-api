'use strict'

class CustomerController {
  async index ({ response }) {
    response.json({
      greeting: 'HERE is all the customers.'
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

module.exports = CustomerController
