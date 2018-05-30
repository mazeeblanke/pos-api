'use strict'

const Product_inquiry = use('App/Models/ProductInquiry')

class ProductInquiryController {


  async index ({ request, response }) {
    const reqData = request.all()
    const limit = reqData.limit || 10
    const name = reqData.name || ''
    const page = reqData.page || 1
    const productInq = await Product_inquiry.query().where('name','like',`%${name}%`).paginate(page, limit)


    response.status(200).json({
      message: 'Product Inquiry Success',
      productInq
    })
  }

  async store ({ request, response }) {
    const {
      customer_id,
      product_id,
      product_name,
      inquiry_note,
      inquiry_date,
      expected_date,
      branch_id,
      store_id
    } = request.post()

    const productInq = await Product_inquiry.create({
      customer_id,
      product_id,
      product_name,
      inquiry_note,
      inquiry_date,
      expected_date,
      branch_id,
      store_id
    })

    response.status(201).json({
      message: 'Product Inquiry Logged',
      data: productInq
    })
  }


  async edit ({  }) {}

}

module.exports = ProductInquiryController
