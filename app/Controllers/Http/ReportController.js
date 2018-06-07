'use strict'

const Database = use('Database')
const SaleDetail = use('App/Models/SaleDetail')
const { parseDateTime } = require('../../../utils/helper')

class ReportController {

  async index ({ request, response }) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const store_id = reqData.store_id
    const branch_id = reqData.branch_id
    const direction = reqData.direction || 'desc'
    let type = reqData.type || 'quantity'
    const report_type = reqData.report_type
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

    if (report_type === 'employee') {
      Results = await this.fetchEmployeeReport(payload)
    }

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
}

module.exports = ReportController
