'use strict'

const Product = use('App/Models/Product')
class ProductController {
  async index ({ response }) {
    const products = await Product.all()

    response.status(200).json({
      message: 'All Product',
      data: products
    })
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
