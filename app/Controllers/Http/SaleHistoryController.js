'use strict'

const Database = use('Database')

const Sale = use('App/Models/Sale')

const SaleDetail = use('App/Models/SaleDetail')

const SALE_DETAILS_FILTERS = ['tax']

const SALES_FILTERS = ['product_id', 'quantity']

class SaleHistoryController {
  constructor () {
    this.filterBy = [
      'user_id',
      'branch_id',
      'store_id',
      'payment_type',
      'sales_id'
    ]
  }

  async index ({ request, auth, response }) {
    const {
      aggregate = 1,
      page = 1,
      limit = 20,
      customer_id,
      with_user,
      with_customer
    } = request.get()

    const req = request.get()

    let builder

    if (parseInt(aggregate)) {
      builder = SaleDetail.query()
      this.filterBy = this.filterBy.concat(SALE_DETAILS_FILTERS)
    } else {
      builder = Sale.query().with('product')
      this.filterBy = this.filterBy.concat(SALES_FILTERS)
    }

    this.filterBy.forEach(filter => {
      if (req[filter]) {
        builder = builder.where(filter, req[filter])
      }
    })

    if (customer_id) {
      builder = builder.whereHas('customerOrder.customer', builder => {
        builder.where('id', customer_id)
      })
      // .with('customerOrder.customer')
    }

    if (with_customer) {
      builder = builder.with('customerOrder.customer')
    }

    if (parseInt(with_user)) {
      builder = builder.with('user')
    }

    const sales_history = await builder
      .orderBy('id', 'desc')
      .paginate(page, limit)

    response.status(200).json({
      message: 'Successfully fetched sales history',
      body: sales_history
    })
  }

  async create () {}

  async store () {}

  async show ({ params: { id }, response, auth }) {
    let builder = await SaleDetail.query()
      .where('id', id)
      .with('customerOrder.customer')
      .with('sales', builder => {
        return builder.with('refund').with('product')
      })
      .first()
    response.status(200).json({
      message: 'Successfully fetched sales history',
      data: builder
    })
  }

  async edit () {}

  async update () {}

  async destroy () {}
}

module.exports = SaleHistoryController
