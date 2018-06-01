'use strict'

const Sales = use('App/Models/Sale')
const Customer_Orders = use('App/Models/CustomerOrder')
const SaleDetail = use('App/Models/SaleDetail')
const Branch_inventory = use('App/Models/ProductsBranch')
const Refund = use('App/Models/Refund')
const Branch = use('App/Models/Branch')

class RefundController {
  async index ({ request, response }) {
    const reqData = request.all()
    const limit = reqData.limit || 10
    const page = reqData.page || 1
    const refunds = await Refund.query().paginate(page, limit)
    console.log(refunds)

    response.status(200).json({
      message: 'All Refunds',
      refunds
    })
  }


  async store ({ response, request }) {
    const { store_id, branch_id, sales_id, discount, products } = request.post()
    const res_ans = []

    for (let product of products) {
      const sales_item = await Sales
      .query()
      .where('store_id', store_id)
      .where('branch_id', branch_id)
      .where('sales_id', sales_id)
      .where('product_id', product.id)
      .first();
      let original_quantity = sales_item.quantity
      sales_item.quantity = original_quantity - parseInt(product.quantity)
      sales_item.sub_total = parseInt(sales_item.unit_price) * parseInt(sales_item.quantity)

       await sales_item.save()

      const product_branch = await Branch_inventory
        .query()
        .where('branch_id', branch_id)
        .where('product_id', product.id)
        .first()
      product_branch.quantity = parseInt(product_branch.quantity) + parseInt(sales_item.quantity)
      await product_branch.save()

      const _SaleDetail = await SaleDetail
        .query()
        .where('sales_id', sales_id)
        .first()

      const branch = await Branch
      .query()
      .where('store_id', store_id)
      .where('branches.id', branch_id)
      .first()


        _SaleDetail.discount = (sales_item.sub_total / (branch.threshold * branch.discount)).toFixed(2)
        _SaleDetail.total = Math.max((sales_item.sub_total - _SaleDetail.discount) +  _SaleDetail.tax, 0)


    // console.log("_SaleDetail: ", _SaleDetail)

      const refund = await Refund.create({
        sales_id: sales_item.id,
        sale_details_id: sales_item.sale_details_id,
        product_id: sales_item.product_id,
        store_id: sales_item.store_id,
        branch_id: sales_item.branch_id,
        user_id: sales_item.user_id,
        quantity_ordered: original_quantity,
        quantity_returned: product.quantity,
        unit_price: product.unitprice
      })

      res_ans.push({
        refund
      })
    }

    response.status(200).json({
      res_ans
    })

  }

}

module.exports = RefundController
