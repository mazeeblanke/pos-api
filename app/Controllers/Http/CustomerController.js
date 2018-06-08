'use strict'

const filters = {
  full_name: { type: 'raw' },
  email: { type: 'raw' },
  city: { type: 'raw' },
  country: { type: 'raw' },
  phone: { type: 'raw' },
  address: { type: 'raw' },
  postalcode: { type: 'raw' },
  cardnumber: { type: 'raw' },
  status: { type: 'plain' },
  access_level: { type: 'plain' },
  gender: { type: 'plain' },
  marital_status: { type: 'plain' },
  store_id: { type: 'plain' }
}

const Customer = use('App/Models/Customer')
class CustomerController {
  async index ({ response, request }) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const page = reqData.page || 1
    const with_store = !!(reqData.with_store || 1)
    let builder = Customer.query()

    Object.keys(filters).forEach(filter => {
      const FILTER_REQ_VALUE = reqData[filter]
      if (FILTER_REQ_VALUE) {
        if (filters[filter].type === 'raw') {
          builder = builder.whereRaw(
            `LOWER(${filter}) LIKE LOWER('%${FILTER_REQ_VALUE}%')`
          )
        } else {
          builder = builder.where(filter, FILTER_REQ_VALUE)
        }
      }
    })

    if (with_store) {
      builder.with('store')
    }

    const customers = await builder.orderBy('id', 'desc').paginate(page, limit)

    response.status(200).json({
      message: 'All Cutomers.',
      data: customers,
      meta: {
        limit,
        page,
        branch_id: reqData['branch_id'],
        email: reqData['email'],
        city: reqData['city'],
        country: reqData['country'],
        phone: reqData['phone'],
        address: reqData['address'],
        gender: reqData['gender'],
        with_store,
        phone: reqData['phone'],
        status: reqData['status'],
        store_id: reqData['store_id']
      }
    })
  }

  async create () {}

  async store ({ response, request, auth }) {
    const loggedInUser = await auth.getUser()
    const store_id = loggedInUser.store_id
    const { customers } = request.post()
    let data

    if (customers) {
      data = await Customer.createMany(customers)
    }

    if (!customers) {
      data = await Customer.create(
        request.only([
          'full_name',
          'phone',
          'gender',
          'store_id',
          'marital_status',
          'email',
          'title',
          'address',
          'town',
          'city',
          'country',
          'postalcode',
          'cardnumber',
          'date_of_birth'
        ])
      )
    }

    response.status(200).json({
      message: 'Successfully Registered customer',
      data: data
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
          'title',
          'town',
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
