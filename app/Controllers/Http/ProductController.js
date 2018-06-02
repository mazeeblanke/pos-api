'use strict'

const Product = use('App/Models/Product')
const ProductsBranch = use('App/Models/ProductsBranch')


class ProductController {
  async index ({ request, response }) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const name = reqData.name || ''
    const page = reqData.page || 1
    const strict = reqData.strict !== undefined
      ? Boolean(parseInt(reqData.strict))
      : true
    let store_id = reqData.store_id
    let products = Product.query()
    let branch_id = reqData.branch_id

    if (store_id) {
      products = products.where('store_id', store_id)
    }

    if (branch_id && strict) {
      products = products
        .whereHas('branches', builder => {
          builder.where('branch_id', branch_id)
        })
        .with('branches', builder => {
          builder.where('branch_id', branch_id)
        })
    }

    if (branch_id && !strict) {
      products = products.with('branches', builder => {
        builder.where('branch_id', branch_id)
      })
    }

    products = await products
      .whereRaw(`LOWER("name") LIKE LOWER('%${name}%')`)
      .orWhere('barcode', name)
      .orderBy('id', 'desc')
      .paginate(page, limit)

    response.status(200).json({
      message: 'All Product',
      products
    })
  }

  async create () {}

  async store ({ request, response }) {
    const { branches, branch_id, products } = request.post()
    let payload

    if (products) {
       payload = await Product.createMany(products)
    }

    if (!products) {
      let product = await Product.create(
        request.only([
          'name',
          'quantity',
          'unitprice',
          'costprice',
          'barcode',
          'reorder',
          'store_id',
          'status'
        ])
      )

      if (branches && branches instanceof Array && branches.length) {
        const _branches = await product.productBranches().createMany(branches)
        product.branch = _branches.find(b => b.branch_id === branch_id) || {}
      } else {
        product.branch = {}
      }

      payload = product
    }

    response.status(200).json({
      message: 'Successfully added product',
      data: payload
    })
  }

  async check ({ request, response }) {
    const { name, limit } = request.post()
    if (limit) {
      const product = await Product.query()
        .where('name', 'like', `%${name}%`)
        .limit(limit)
      response.status(200).json({
        message: 'Single Product',
        count: product.length,
        data: product
      })
    } else {
      const product = await Product.query()
        .where('name', 'like', `%${name}%`)
        .limit(10)
      response.status(200).json({
        message: 'Single Product',
        count: product.length,
        data: product
      })
    }
  }

  async show ({ response, params: { id } }) {
    const product = await Product.find(id)

    if (product) {
      response.status(200).json({
        message: 'Successfully loaded product !!',
        product
      })
    } else {
      response.status(404).json({
        message: 'Product not found!',
        id
      })
    }
  }


  async edit () {}

  async update () {}

  async destroy () {}
}

module.exports = ProductController
