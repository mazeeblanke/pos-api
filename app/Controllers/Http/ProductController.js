'use strict'

const Product = use('App/Models/Product')
const ProductsBranch = use('App/Models/ProductsBranch')
const Store = use('App/Models/Store')


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
    let branch_id = reqData.branch_id
    let below_reorder = reqData.below_reorder || 0
    let products = Product.query()

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

    if (parseInt(below_reorder)) {
      products = products
        .whereHas('productBranches', builder => {
          builder.whereRaw('product_branches.quantity < product_branches.reorder')
        })
        .with('productBranch')
    }

    products = await products
      .whereRaw(`LOWER("name") LIKE LOWER('%${name}%')`)
      .orWhere('barcode', name)
      .orderBy('id', 'desc')
      .paginate(page, limit)

    response.status(200).json({
      message: 'All Product',
      products,
      meta: {
        limit,
        name,
        page,
        branch_id,
        store_id
      }
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

  async show ({ request, response, params: { id } }) {
    const req = request.all()
    const product = await Product
    .query()
    .where('id', id)
    .with('productBranch', builder => {
      builder.where('branch_id', req.branch_id).with('branch')
    })
    .first()

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

  async update ({ params: { id }, response, request }) {
    let product = await Product.find(id)
    const req = request.all()
    let productBranch
    let updated

    if (product) {
      product.merge(
        request.only([
          'name',
          'quantity',
          'unitprice',
          'costprice',
          'barcode',
          'store_id',
          'reorder',
          'status'
        ]),
      )

      await product.save()

      if (req.productBranches.id) {
        productBranch = await ProductsBranch
        .find(req.productBranches.id)
      }
       
      if (req.productBranches && productBranch) {
        productBranch.merge(req.productBranches)
        await productBranch.save()
      } else if (req.productBranches && !productBranch) {
        productBranch = await ProductsBranch.create(req.productBranches)
      } 

      await productBranch.load('branch')

      let results = {
        ...product.toJSON(),
        productBranch
      }

      response.status(200).json({
        message: 'Successfully updated product details',
        data: results
      })

    } else {
      response.status(404).json({
        message: 'Product not found',
        id
      })
    }
  }

  async destroy () {}
}

module.exports = ProductController
