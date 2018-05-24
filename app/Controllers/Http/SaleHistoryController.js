'use strict'

const Database = use('Database')

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
    const { aggregate = 1, page = 1, limit = 20 } = request.get()

    const req = request.get()

    let builder;

    if (!!parseInt(aggregate)) {
      builder = Database.table('sale_details')
      this.filterBy = this.filterBy.concat(SALE_DETAILS_FILTERS)
    } else {
      builder = Database.table('sales')
      this.filterBy = this.filterBy.concat(SALES_FILTERS)
    }

    this.filterBy.forEach(filter => {
      if (req[filter]) {
        builder = builder.where(filter, req[filter])
      }
    })

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
