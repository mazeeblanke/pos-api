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

  async create () {
  }

  async store ({ response, request }) {
    const { first_name, last_name, phone, gender, marital_status, email, address, city, country, postalcode, cardnumber, store_id } = request.post()
    const customer = await Customer.create({ first_name, last_name, phone, gender, marital_status, email, address, city, country, postalcode, cardnumber, store_id })

    response.status(201).json({
      message: "Successfully Registered customer",
      data: customer
    })
  }

  async show ({ response, params: { id }}) {
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

  async edit () {
  }

  async update ({ request, response, params: {id}}) {
    const customer = await Customer.find(id)

    if (customer) {
      const { first_name, last_name, phone, gender, marital_status, email, address, city, country, postalcode, cardnumber } = request.post()

      customer.first_name = first_name
      customer.last_name = last_name
      customer.phone = phone
      customer.gender = gender
      customer.marital_status = marital_status
      customer.email = email
      customer.address = address
      customer.city = city
      customer.country = country
      customer.postalcode = postalcode
      customer.cardnumber = cardnumber

      await customer.save()

      response.status(200).json({
        message: 'Successfully update customer details,',
        data: customer
      })
    } else  {
      response.status(404).json({
        message: 'Customer not found',
        id
      })
    }
  }

  async destroy () {
  }

  async delete({ response, param: { id } }) {
    const customer = await Customer.find(id)

    if(customer) {
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
