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

  async index ({ request, auth, response}) {
    const { aggregate = 1, page = 1, limit = 20, customer_id, with_user } = request.get()

    const req = request.get()

    let builder;

    if (!!parseInt(aggregate)) {
      builder = SaleDetail.query()
      this.filterBy = this.filterBy.concat(SALE_DETAILS_FILTERS)
    } else {
      builder = Sale.query()
      this.filterBy = this.filterBy.concat(SALES_FILTERS)
    }


    this.filterBy.forEach(filter => {
      if (req[filter]) {
        builder = builder.where(filter, req[filter])
      }
    })


    if (!!customer_id && !!!parseInt(aggregate)) {
      builder = builder
      .whereHas('customerOrder', (builder) => {
        builder.where('customer_id', customer_id)
      })
      .with('customerOrder.customer')
    }

    if (!!parseInt(with_user)) {
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

  async create () {
  }

  async store () {
  }

  async show () {
  }

  async edit () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = SaleHistoryController
