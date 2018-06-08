'use strict'

const Database = use('Database')
const SaleDetail = use('App/Models/SaleDetail')
const {
  parseDateTime
} = require('../../../utils/helper')

class ReportController {

  async index({
    request,
    response
  }) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const store_id = reqData.store_id
    const branch_id = reqData.branch_id
    const direction = reqData.direction || 'desc'
    let type = reqData.type || 'quantity'
    const report_type = reqData.report_type
<<<<<<< HEAD
    const totime = reqData.totime ?
      parseDateTime(reqData.totime) :
      parseDateTime("4000-04-12")
    const fromtime = reqData.fromtime ?
      parseDateTime(reqData.fromtime) :
      parseDateTime('0001-01-01')
    let Builder;

    if (report_type === 'product') {
      Builder = Sale
        .query()
        .with('user')
        .with('refund')
        .with('product')
        .with('store')
        .with('branch')
        .whereBetween('created_at', [fromtime, totime])
        .where('branch_id', branch_id)
        .where('store_id', store_id)
        .orderBy(type, direction)
        .limit(limit)
=======
    const totime = reqData.totime
      ? parseDateTime(reqData.totime)
      : parseDateTime("4000-04-12")
    const fromtime = reqData.fromtime
      ? parseDateTime(reqData.fromtime)
      : parseDateTime('0001-01-01')
    let Results
    let messages = []
    let filters = ['quantity', 'sub_total', 'profit', 'tax', 'discount']

    if (type == 'total') type = 'sub_total'

    const payload = {
      type,
      limit,
      store_id,
      branch_id,
      direction,
      totime,
      fromtime,
    }

    if (!['asc', 'desc'].includes(direction)) {
      messages.push(
        'Direction can only be -asc or -desc'
      )
    }

    if (!filters.includes(type)) {
      messages.push(
        `Filter ${type} does not exist for ${report_type}s!`
      )
    }

    if (messages.length) {
      return response.status(404).json({
        messages
      })
    }

    if (report_type === 'product') {
      Results = await this.fetchProductReport(payload)
    }
// >>>>>>> 7c1528fa2d240dad1023a26bb79ea76e19d39ba8

    if (report_type === 'employee') {
      Results = await this.fetchEmployeeReport(payload)
    }

    const Results = await Builder.fetch()

    if (report_type === 'customer') {
      Results = await this.fetchCustomerReport(payload)
    }

    response.status(200).json({
      message: 'Successfully fetched results',
      data: Results.rows,
      meta: {
        direction,
        type: type === 'sub_total' ? 'total' : type,
        report_type,
        totime,
        fromtime,
        limit
      }
    })

  }

  async productreport({
    request,
    response
  }) {
    const reqData = request.all()
    const from_time = reqData.from_time ? parseDateTime(reqData.from_time) : parseDateTime('0001-01-01')
    const to_time = reqData.to_time ? parseDateTime(reqData.to_time) : parseDateTime(Date.now())
    const limit = reqData.limit || 20
    const page = reqData.page || 1
    const direction = reqData.direction
    const type = reqData.type || 'profit'
    const store_id = reqData.store_id || 1
    const branch_id = reqData.branch_id || 1

    let sales = await Sale
      .query()
      .where('store_id', store_id)
      .where('branch_id', branch_id)
      .whereBetween('created_at', [from_time, to_time])
      .with('product')
      .paginate(page, limit)

    let product_ids = []
    sales.toJSON()['data'].forEach(element => {
      product_ids.push(element.product_id)
    })

    product_ids = [...new Set(product_ids)]

    let sum_quantity = 0
    let sum_total = 0
    let prd_name = ''
    let sum_profit = 0
    let obj = {}

    product_ids.forEach(id => {
      sales.toJSON()['data'].forEach(element => {
        if (element.product_id === id) {
          sum_quantity += parseInt(element.quantity);
          sum_total += parseFloat(element.sub_total);
          sum_profit += parseFloat(element.profit)
          prd_name = element.product.name
        }
      })

      obj[id] = {
        sum_quantity: sum_quantity,
        sum_total: sum_total,
        product_name: prd_name,
        sum_profit: sum_profit
      }
      sum_quantity = 0;
      sum_profit = 0;
      sum_total = 0;
    })
    let entries = Object.entries(obj)
    // console.log("entries: ", entries)
    let sorted
    switch (type) {
      case 'quantity':
        console.log('QUANTITY SELECTED')
        sorted = entries.sort((a, b) => a[1].sum_quantity - b[1].sum_quantity)
        break;
      case 'total':
        console.log('TOTAL SELECTED')
        sorted = entries.sort((a, b) => a[1].sum_total - b[1].sum_total)
        console.log(sorted)
        break;
      case 'profit':
      console.log('PROFIT SELECTED')
        sorted = entries.sort((a, b) => a[1].sum_profit - b[1].sum_profit)
        break;
      default:
        console.log("type: ", type)

    }


    // console.log('Builder: ', sales.toJSON()['data'])

    response.status(200).json({
      message: 'Summary Report',
      order_by: type,
      obj: sorted
    })

  async fetchCustomerReport (payload) {
    let subQuery = `
        SELECT sale_details_id, sum(sales.${payload.type}) AS ${payload.type} FROM sales
      `

    if (['discount', 'tax'].includes(payload.type)) {
      subQuery = `
        SELECT sale_details_id, sum(sale_details.${payload.type}) AS ${payload.type} FROM sale_details
      `
    }

    return await Database.raw(`
      SELECT customer_orders.*, c.*, j.* from customer_orders
      JOIN (
        ${subQuery}
        WHERE branch_id = ${payload.branch_id} AND
        store_id = ${payload.store_id} AND
        created_at BETWEEN CAST('${payload.fromtime}' AS date) AND CAST('${payload.totime}' AS date)
        GROUP BY sale_details_id
        ORDER BY ${payload.type} ${payload.direction}
      )
      AS j on j.sale_details_id = customer_orders.sale_details_id
      JOIN (
        SELECT * FROM customers
      )
      AS c on c.id = customer_orders.customer_id
      ORDER BY j.${payload.type} ${payload.direction}
      limit ${payload.limit}
    `)
  }


  async fetchEmployeeReport (payload) {

    let subQuery = `
        SELECT user_id, sum(sales.${payload.type}) AS ${payload.type} FROM sales
      `
    if (['discount', 'tax'].includes(payload.type)) {
      subQuery = `
        SELECT user_id, sum(sale_details.${payload.type}) AS ${payload.type} FROM sale_details
      `
    }

    return await Database.raw(`
      SELECT users.*, j.* FROM users
      JOIN (
        ${subQuery}
        WHERE branch_id = ${payload.branch_id} AND
        store_id = ${payload.store_id} AND
        created_at BETWEEN CAST('${payload.fromtime}' AS date) AND CAST('${payload.totime}' AS date)
        GROUP BY user_id
        ORDER BY ${payload.type} ${payload.direction}
        limit ${payload.limit}
      )
      AS j on j.user_id = users.id
      ORDER BY j.${payload.type} ${payload.direction}
    `)
  }


  async fetchProductReport (payload) {
    return await Database.raw(`
      SELECT products.*, j.* FROM products
      JOIN (
        SELECT product_id, sum(${payload.type}) AS ${payload.type} FROM sales
        WHERE branch_id = ${payload.branch_id} AND
        store_id = ${payload.store_id} AND
        created_at BETWEEN CAST('${payload.fromtime}' AS date) AND CAST('${payload.totime}' AS date)
        GROUP BY product_id
        ORDER BY ${payload.type} ${payload.direction}
        limit ${payload.limit}
      )
      AS j on j.product_id = products.id
      ORDER BY j.${payload.type} ${payload.direction}
    `)
  }

  async create() {}

  async store() {}

  async show() {}

  async edit() {}

  async update() {}

  async destroy() {}
}

module.exports = ReportController
