'use strict'

const Sales = use('App/Models/Sale')
const Customer_Orders = use('App/Models/CustomerOrder')
const SaleDetail = use('App/Models/SaleDetail')
// const Store_inventory = use('App/Models/Product')
// const Branch_inventory = use('App/Models/ProductsBranch')


class SaleController {
  async index ({ response }) {
    const sales = await Sales.all()

    response.status(200).json({
      message: 'All Sales Transactions',
      data: sales
    })
  }

  async create () {
  }

  async store ({ response, request, auth }) {
    let loggedInUser = await auth.getUser()
    let user_id = loggedInUser.id
    let store_id = loggedInUser.store_id
    let sales_record = []
    const {
      amountPaid,
      total,
      cashChange,
      subTotal,
      discountTotal,
      taxTotal,
      branch_id,
      customer_id,
      sales_id,
      tax,
      payment_type,
      products,
      discount,
      customer
    } = request.post()

    const _SaleDetail = await SaleDetail.create({
      sales_id,
      user_id,
      tax,
      discount,
      branch_id,
      payment_type,
      amount_paid: amountPaid,
      total
    })

    for (let product of products) {
      if (product) {
        var { id: product_id, name, unitprice: unit_price, quantity, subTotal: sub_total } = product
        const sale = await Sales.create({
          // branch_id,
          // sales_id,
          product_id,
          unit_price,
          quantity,
          sale_details_id: _SaleDetail.id,
          sub_total
          // total,
          // discount: discountTotal,
          // tax: taxTotal
        })

        //update branch Inventory
        // const update_branch_inventory = await product_branch.findBy("product_id", product_id)
        // console.log('update_branch_inventory: ', update_branch_inventory)
        // update_branch_inventory.quantity = update_branch_inventory.quantity - quantity
        // await update_branch_inventory.save()

        //update Store Inventory
        const store_inventory = await Store_inventory.query().where("id", product_id)
        console.log(store_inventory)
        // store_inventory.quantity =  store_inventory.quantity - quantity
        // await store_inventory.save()





        sales_record.push(sale)
      }

    }


    if (customer_id) {
      // const gross = await request.post().total
      const cust_ord = await Customer_Orders.create({ customer_id, sales_id: _SaleDetail.id, gross: total })
      response.status(200).json({
        message: 'Successfully added Customer sales.',
        cust_ord,
        sales_record
      })
    } else {
      response.status(200).json({
        message: 'Successfully added sales record.',
        sales_record
      })
    }
  }

  async show ({ response, params: { id }}) {
    // const sale = await Sales.find(id)
    const sale = await Sales.query().where({sales_id:id})

    if (sale.length) {
      response.status(200).json({
        message: 'Single Sale Transaction',
        data: sale
      })
    } else {
      response.status(404).json({
        message: 'sale record not found!',
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

module.exports = SaleController
