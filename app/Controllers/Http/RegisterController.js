'use strict'

const User = use('App/Models/User')
class RegisterController {

  async store({
    request,
    response
  }) {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      access_level,
      status,
      branch_id
    } = request.post()

    console.log(username,
      email,
      password,
      first_name,
      last_name,
      access_level,
      status,
      branch_id)

    const user = new User()
    user.email = email
    user.password = password
    user.first_name = first_name
    user.last_name = last_name
    user.access_level = access_level
    user.status = status
    user.branch_id = branch_id

    // const user = await User.create({})
    // console.log(user)
    await user.save()

    response.json({
      message: 'Successfully created a new user.',
      data: user
    })
  }
}

module.exports = RegisterController
