'use strict'

const Product = use('App/Models/Product')
class ProductController {
  async index ({ request, response }) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const name = reqData.name || ''
    const page = reqData.page || 1
    let branch_id;
    if (branch_id = reqData.branch_id) {
      const products = await Product
      .query()
      .where('name', 'like', `%${name}%`)
      .whereHas('branches', (builder) => {
        builder.where('branch_id', branch_id)
      })
      .with('branches', builder => {
        builder.where('branch_id', branch_id)
      })
      .paginate(page, limit)

      response.status(200).json({
        message: 'All Product',
        products
      })
    } else {
      response.status(400).json({
        message: 'Branch id not selected',
      })
    }
  }

  async create () {
  }

  async store ({ request, response }) {
    const {name, quantity, unitprice, costprice, barcode, status} = request.post()
    const product = await Product.create({name, quantity, unitprice, costprice, barcode, status})

    response.status(201).json({
      message: 'Successfully added product',
      data: product
    })
  }

  async check ({ request, response}) {
    const {name, limit} = request.post()
    if (limit) {
      const product = await Product.query().where('name', 'like', `%${name}%`).limit(limit)
      response.status(200).json({
        message: 'Single Product',
        count: product.length,
        data: product
      })
    }
    else {
      const product = await Product.query().where('name', 'like', `%${name}%`).limit(10)
      response.status(200).json({
        message: 'Single Product',
        count: product.length,
        data: product
      })
    }
  }

  async show ({ response, params: { id }}) {
    const product = await Product.find(id)

    if (product) {
      response.status(200).json({
        message: 'Single Product',
        data: product
      })
    } else {
      response.status(404).json({
        message: 'Product not found!',
        id
      })
    }
  }

  async edit () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = ProductController
