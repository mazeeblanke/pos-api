'use strict'

const User = use('App/Models/User')
class UserController {
  async index({ response }) {
    // const users = await User.all()
    const reqData = request.all()
    const limit = reqData.limit || 10
    const name = reqData.name || ''
    const page = reqData.page || 1
    const users = await User.query().where('name','like',`%${name}%`).paginate(page, limit)

    response.status(200).json({
      message: 'All Users',
      data: users
    })
  }

  async show({ response, params: { id } }) {

    const user = await User.find(id)

    if (user) {
      response.status(200).json({
        message: 'Single User',
        data: user
      })
    } else {
      response.status(404).json({
        message: 'User not found!',
        id
      })
    }
  }

  async store({ request, response}) {


    const {email, password, first_name, last_name, access_level, status, username,branch_id} = request.post()
    const user = await User.create({username, email, password, first_name, last_name, access_level, status, branch_id})

    response.status(201).json({
      message: 'Successfully created a new user.',
      data: user
    })
  }

  async update({ request, response, params: { id } }) {
    const user = await User.find(id)

    if(user) {
      const {email, password, first_name, last_name, access_level, status, username} = request.post()

      user.email = email
      user.password = password
      user.first_name = first_name
      user.last_name = last_name
      user.access_level = access_level
      user.status = status
      user.username = username

      await user.save()

      response.status(200).json({
        message: 'Successfully update user,',
        data: user
      })
    } else {
      response.status(404).json({
        message: 'User not found',
        id
      })
    }
  }

  // async delete({ response, param: { id } }) {
  //   const user = await User.find(id)

  //   if(user) {
  //     await user.delete()

  //     response.status(200).json({
  //       message: 'Successfully delete user,',
  //       id
  //     })
  //   } else {
  //     response.status(404).json({
  //       message: 'User not found',
  //       id
  //     })
  //   }
  // }
}

module.exports = UserController
