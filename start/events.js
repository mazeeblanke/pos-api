const Event = use('Event')
const Mail = use('Mail')


Event.on('new::user', async (user) => {
  await Mail.send('auth.emails.confirm_email', user.toJSON(), (message) => {
    message.to(user.email)
    message.from('from@email')
    message.subject('Please confirm your email')
  })
})



Event.on('new::transfer_record_history', async (transfer_record_history) => {
  // await Mail.send('auth.emails.confirm_email', transfer_record_history.toJSON(), (message) => {
  //   message.to()
  //   message.from('from@email')
  //   message.subject('Product Transfer Notification')
  // })
  console.log('branch_sender')
})


Event.on('new::transfer_record_history', async (transfer_record_history) => {
  // await Mail.send('auth.emails.confirm_email', transfer_record_history.toJSON(), (message) => {
  //   message.to()
  //   message.from('from@email')
  //   message.subject('Product Transfer Notification')
  // })
  console.log('branch_receiver')
})
