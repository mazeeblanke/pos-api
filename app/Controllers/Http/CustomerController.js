'use strict'

const Customer = use('App/Models/Customer')
class CustomerController {
  async index ({ response }) {
    const customer = await Customer.all()

    response.status(200).json({
      message: 'All Cutomers.',
      data: customer
    })
  }

  async create () {}

  async store ({ response, request }) {
    const customer = await Customer.create(
      request.only([
        'first_name',
        'last_name',
        'phone',
        'gender',
        'store_id',
        'marital_status',
        'email',
        'address',
        'city',
        'country',
        'postalcode',
        'cardnumber',
        'date_of_birth'
      ])
    )

    response.status(201).json({
      message: 'Successfully Registered customer',
      data: customer
    })
  }

  async show ({ response, params: { id } }) {
    const customer = await Customer.find(id)

    if (customer) {
      response.status(200).json({
        message: 'Single Customer',
        data: customer
      })
    } else {
      response.status(404).json({
        message: 'Customer not found!',
        id
      })
    }
  }

  async edit () {}

  async update ({ request, response, params: { id } }) {
    let customer = await Customer.find(id)

    if (customer) {
      customer.merge(
        request.only([
          'first_name',
          'last_name',
          'phone',
          'gender',
          'marital_status',
          'email',
          'store_id',
          'address',
          'city',
          'country',
          'postalcode',
          'cardnumber',
          'date_of_birth'
        ])
      )

      customer = await customer.save()

      response.status(200).json({
        message: 'Successfully update customer details,',
        customer
      })
    } else {
      response.status(404).json({
        message: 'Customer not found',
        id
      })
    }
  }

  async destroy () {}

  async delete ({ response, param: { id } }) {
    const customer = await Customer.find(id)

    if (customer) {
      await customer.delete()

      response.status(200).json({
        message: 'Successfully delete Customer,',
        id
      })
    } else {
      response.status(404).json({
        message: 'Customer not found',
        id
      })
    }
  }
}

module.exports = CustomerController
