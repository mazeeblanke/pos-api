const Event = use('Event')
const Mail = use('Mail')


Event.on('new::user', async (user) => {
  await Mail.send('auth.emails.confirm_email', user.toJSON(), (message) => {
    message.to(user.email)
    message.from('from@email')
    message.subject('Please confirm your email')
  })
})



Event.on('new::transfer_record_history_branch_sender', async (branch_sender) => {
  await Mail.send('auth.emails.product_transfer_notification_sender', branch_sender.toJSON(), (message) => {
    // message.to(branch_sender.toJSON().branch.email)
    message.to('easymax1069@gmail.com')
    message.from('from@email')
    message.subject('Product Transfer Notification Sender')
  })
  console.log('branch_sender')
  // console.log(branch_sender.toJSON().branch)
  console.log(branch_sender.toJSON())
})


Event.on('new::transfer_record_history_branch_receiver', async (branch_receiver) => {
  // await Mail.send('auth.emails.product_transfer_notification_reciever', branch_receiver.toJSON(), (message) => {
  //   message.to(branch_receiver.branch.email)
  //   message.from('from@email')
  //   message.subject('Product Transfer Notification Receiver')
  // })
  // console.log('branch_receiver')
  // console.log(branch_receiver.toJSON().product)
})
