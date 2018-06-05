'use strict'

const Product_inquiry = use('App/Models/ProductInquiry')

class ProductInquiryController {

  async index ({ request, response }) {
    const reqData = request.all()
    const limit = reqData.limit || 10
    const name = reqData.name || ''
    const page = reqData.page || 1
    const branch_id = reqData.branch || 1
    const store_id = reqData.store || 1
    const productInq = await Product_inquiry.query()
    .where('store_id', store_id)
    .where('branch_id', branch_id)
    .whereRaw(`lOWER("product_name") like LOWER('%${name}%')`)
    .with('branch')
    .with('user')
    .with('customer')
    .with('product')
    .orderBy('id', 'desc')
    .paginate(page, limit)

    response.status(200).json({
      message: 'Product Inquiry Success',
      data: productInq
    })

  }

  async store ({ request, response, auth }) {
    const products = request.post().products
    const loggedInUser = await auth.getUser()
    const payload = products.map((p) => {
      return {
        customer_id: p.customer_id,
        user_id: loggedInUser.id,
        product_id: p.product_id, 
        product_name: p.product_name,
        inquiry_note: p.inquiry_note,
        quantity: p.qty,
        expected_date: p.expected_date,
        branch_id: p.branch_id,
        store_id: p.store_id
      }
    })

    let _products = await Product_inquiry.createMany(payload)

    _products = _products.map(p => p.id)
    const data = await Product_inquiry
    .query()
    .whereIn('id', _products)
    .with('branch')
    .with('user')
    .with('customer')
    .with('product')
    .fetch()

    response.status(201).json({
      message: 'Product Inquiry Logged',
      data
    })

  }


  async edit ({  }) {}

  async update ({ request, params: { id }, response}) {

    const Inquiry = await Product_inquiry.find(id)

    if (Inquiry) {
      const {
        customer_id,
        product_id,
        product_name,
        qty,
        status,
        actual_note,
        inquiry_note,
        expected_date,
        branch_id,
        store_id
      } = request.post()

      let payload = {
        customer_id,
        product_id,
        product_name,
        quantity: qty,
        status,
        actual_note,
        inquiry_note,
        expected_date,
        branch_id,
        store_id
      }

      Inquiry.merge(payload)

      await Inquiry.save()
      
      const data = await Product_inquiry
      .query()
      .where('id', id)
      .with('branch')
      .with('user')
      .with('customer')
      .with('product')
      .first()

      response.status(200).json({
        message: 'Product Inquiry Updated',
        data
      })
    }
  }

}

module.exports = ProductInquiryController
