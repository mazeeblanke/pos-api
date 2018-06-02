const Event = use('Event')
const Mail = use('Mail')


Event.on('new::user', async (user) => {
  await Mail.send('auth.emails.confirm_email', user.toJSON(), (message) => {
    message.to(user.email)
    message.from('from@email')
    message.subject('Please confirm your email')
  })
})
