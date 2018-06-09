'use strict'

const Products_branch = use('App/Models/ProductsBranch')
const Product_transfer = use('App/Models/ProductTransfer')
const Products = use('App/Models/Product')
const Event = use('Event')
const { parseDateTime } = require('../../../utils/helper')

class ProductTransferController {
  async index({ request, response }) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const page = reqData.page || 1
    const store_id = reqData.store_id || 1
    const user_id = reqData.user_id || 1
    const totime = reqData.totime ? parseDateTime(reqData.totime) : parseDateTime(Date.now())
    const fromtime = reqData.fromtime ? parseDateTime(reqData.fromtime)  : parseDateTime('0001-01-01')

    let prd_trans = await Product_transfer
    .query()
    .orderBy('id', 'desc')
    .with('user')
    .with('store')
    .with('branch')
    .with('product')
    .paginate(page, limit)

    response.status(200).json({
      message: 'product transfer !!',
      data: prd_trans
    })
  }

  async store ({ request, response, auth}) {
    const reqData = request.post()
    const source = reqData.source || ''
    let transfer_record_history = []

    switch(source) {

      case 'store':

        for (let product of reqData.data) {

        const source_store_product = await Products
          .query()
          .where('store_id', product.store_id)
          .where('id', product.product_id)
          .first()

        const destination_branch_product = await Products_branch
          .query()
          .where('store_id', product.store_id)
          .where('branch_id', product.to_branch_id)
          .where('product_id', product.product_id)
          .first()

        source_store_product.quantity = parseInt(source_store_product.quantity) - parseInt(product.quantity_to_transfer)
        destination_branch_product.quantity = parseInt(destination_branch_product.quantity) + parseInt(product.quantity_to_transfer)

        await source_store_product.save()
        await destination_branch_product.save()

        const transfer_record = await Product_transfer.create({
          transfer_id : product.transfer_id,
          store_id : product.store_id,
          user_id: product.user_id,
          source_id : product.source_id,
          to_branch_id : product.to_branch_id,
          product_id : product.product_id,
          quantity_transferred : product.quantity_to_transfer,
          source: source
        })

        transfer_record_history.push(transfer_record)
        }

        response.status(200).json({
          message: 'Product Transfer Complete! --Store',
          source: source,
          transfer_record_history: transfer_record_history
        })

      break;

      case 'branch':

        for (let product of reqData.data) {
          const source_branch_product = await Products_branch
            .query()
            .where('store_id', product.store_id)
            .where('branch_id', product.source_id)
            .where('product_id', product.product_id)
            .first()

          const destination_branch_product = await Products_branch
            .query()
            .where('store_id', product.store_id)
            .where('branch_id', product.to_branch_id)
            .where('product_id', product.product_id)
            .first()

          source_branch_product.quantity = parseInt(source_branch_product.quantity) - parseInt(product.quantity_to_transfer)
          destination_branch_product.quantity = parseInt(destination_branch_product.quantity) + parseInt(product.quantity_to_transfer)

          await source_branch_product.save()
          await destination_branch_product.save()

          const transfer_record = await Product_transfer.create({
            transfer_id : product.transfer_id,
            store_id : product.store_id,
            user_id: product.user_id,
            source_id : product.source_id,
            to_branch_id : product.to_branch_id,
            product_id : product.product_id,
            quantity_transferred : product.quantity_to_transfer,
            source: source
          })

          transfer_record_history.push(transfer_record)
        }

        response.status(200).json({
          message: 'Product Transfer Complete! --Branch',
          source: source,
          transfer_record_history: transfer_record_history
        })
        break;

      default:
      console.log('DAFAULT DEFAULT')
    }

  }

}

module.exports = ProductTransferController
