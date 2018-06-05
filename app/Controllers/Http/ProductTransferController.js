'use strict'

const Branch_inventory = use('App/Models/ProductsBranch')
const Product_transfer = use('App/Models/ProductTransfer')
const Event = use('Event')

class ProductTransferController {
  async index({ request, response }) {
    // const reqData = request.all()
    // const limit = reqData.limit || 20
    // const store_id = reqData.store_id || 1
    // const from_branch_id = reqData.from_branch_id || 1
    // const page = reqData.page || 1
    // const to_branch_id = reqData.to_branch_id || 1
    // const product_id = reqData.product_id || 1


    // const prd_trans = await Product_transfer.query()
    // .where('store_id', store_id)
    // .where('from_branch_id', from_branch_id)
    // .where('to_branch_id', to_branch_id)
    // .where('product_id', product_id)
    // .paginate(page, limit)

    const prd_trans = await Product_transfer.all()
    response.status(200).json({
      message: 'product transfer !!',
      data: prd_trans
    })
  }

  async store ({ request, response, auth}) {

    const reqData = request.post().data
    let transfer_record_history = []
    let branch_sender = {}
    let branch_receiver = {}

    for (let product of reqData) {

      const take_from_branch = await Branch_inventory.query()
      .where('store_id', product.store_id)
      .where('branch_id', product.from_branch_id)
      .where('product_id', product.product_id)
      .with('product')
      .with('branch')
      .first()

      branch_sender = take_from_branch

      const add_to_branch = await Branch_inventory.query()
      .where('store_id', product.store_id)
      .where('branch_id', product.to_branch_id)
      .where('product_id', product.product_id)
      .with('branch')
      .with('product')
      .first()
        
      branch_receiver = add_to_branch

      // take_from_branch.quantity = take_from_branch.quantity - parseInt(product.quantity_transferred)
      // add_to_branch.quantity = add_to_branch.quantity + parseInt(product.quantity_transferred)

      // await take_from_branch.save()
      // await add_to_branch.save()

      const transfer_record = await Product_transfer.create({
        transfer_id : product.transfer_id,
        store_id : product.store_id,
        from_branch_id : product.from_branch_id,
        to_branch_id : product.to_branch_id,
        product_id : product.product_id,
        quantity_transferred : product.quantity_transferred
      })

      // console.log('take_from_branch: ', take_from_branch.product.toJSON())

      transfer_record_history.push(transfer_record)
    }

    // Event.fire('new::transfer_record_history', [branch_sender,branch_receiver])
    Event.fire('new::transfer_record_history_branch_sender', branch_sender)
    Event.fire('new::transfer_record_history_branch_receiver', branch_receiver)

    response.status(200).json({
      message: 'Transfer Done!',
      transfer_record_history
    })
  }

}

module.exports = ProductTransferController
