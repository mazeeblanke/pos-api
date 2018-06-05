'use strict'

const Supplier = use('App/Models/Supplier')

class SupplierController {
  async index ({ request, response}) {
    const reqData = request.all()
    const limit = reqData.limit || 10
    const name = reqData.name || ''
    const page = reqData.page || 1
    const branch_id = reqData.branch || 1
    const store_id = reqData.store || 1
    const supplier = await Supplier.query()
    .where('store_id', store_id)
    // .where('branch_id', branch_id)
    .whereRaw(`lOWER("name") like LOWER('%${name}%')`)
    .with('branch')
    .with('store')
    .orderBy('id', 'desc')
    .paginate(page, limit)

    response.status(200).json({
      message: 'Successfully loaded suppliers',
      data: supplier
    })
  }

  async create () {
  }

  async store ({ request, response, auth }) {

    const {
      email,
      name,
      phone,
      address,
      // branch_id,
      store_id
    } = request.post()
 
    let supplier = await Supplier.create({
      email,
      name,
      phone,
      address,
      // branch_id,
      store_id
    })


    response.status(200).json({
      message: 'Supplier created successfully!',
      data: supplier
    })
  }

  async show ({ request, response, params: { id } }) {
    const supplier = await Supplier.find(id)

    if (supplier) {
      response.status(200).json({
        message: 'Successfully loaded supplier !!',
        data: supplier
      })
    } else {
      response.status(404).json({
        message: 'Supplier not found!',
        id
      })
    }
  }

  async edit () {
  }

  async update ({ request, params: { id }, response}) {
    let supplier = await Supplier.find(id)

    if (Supplier) {
      const {
        name,
        email,
        phone,
        address
      } = request.post()

      let payload = {
        name,
        email,
        phone,
        address
      }

      supplier.merge(payload)

      await supplier.save()

      response.status(200).json({
        message: 'Supplier Updated',
        data: supplier
      })
    } else {
       response.status(404).json({
        message: 'Supplier not found',
      })
    }
  }

  async destroy () {
  }
}

module.exports = SupplierController
