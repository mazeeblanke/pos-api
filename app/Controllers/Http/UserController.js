'use strict'

const User = use('App/Models/User')

const filters = {
  username: { type: 'raw' },
  email: { type: 'raw' },
  full_name: { type: 'raw' },
  status: { type: 'plain' },
  access_level: { type: 'plain' },
  branch_id: { type: 'plain' },
  store_id: { type: 'plain' }
}

class UserController {
  async index ({ response, request }) {
    const reqData = request.all()
    const limit = reqData.limit || 20
    const page = reqData.page || 1
    const with_branch = !!(reqData.branch || 1)
    let builder = User.query()

    Object.keys(filters).forEach(filter => {
      const FILTER_REQ_VALUE = reqData[filter]
      if (FILTER_REQ_VALUE) {
        if (filters[filter].type === 'raw') {
          builder = builder.whereRaw(
            `LOWER(${filter}) LIKE LOWER('%${FILTER_REQ_VALUE}%')`
          )
        } else {
          builder = builder.where(filter, FILTER_REQ_VALUE)
        }
      }
    })

    if (with_branch) {
      builder.with('branch')
    }

    const users = await builder
    .orderBy('id', 'desc')
    .paginate(page, limit)

    response.status(200).json({
      message: 'All Users',
      data: users
    })
  }

  async show ({ response, params: { id } }) {
    const user = await User.query().where('id', id).with('branch').first()

    if (user) {
      response.status(200).json({
        message: 'Successfully loaded user!!',
        data: user
      })
    } else {
      response.status(404).json({
        message: 'User not found!',
        id
      })
    }
  }

  async store ({ request, response, auth }) {
    const loggedinUser = await auth.getUser()
    const { users } = request.post()
    let data

    if (users) {

      data = []

      for (let user of users) {
        const _user = await User.create(user)
        await _user.load('branch')
        data.push(_user)
      }

    }

    if (!users) {
      data = await User.create({
        ...request.only([
          'email',
          'password',
          'full_name',
          'access_level',
          'status',
          'username',
          'branch_id'
        ]),
        store_id: loggedinUser.store_id
      })

      await data.load('branch')
    }

    response.status(201).json({
      message: 'Successfully created a new user.',
      data: data
    })
  }

  async update ({ request, response, params: { id } }) {
    const user = await User.find(id)

    if (user) {
      const {
        email = user.email,
        password = user.password,
        full_name = user.full_name,
        access_level = user.access_level,
        status = user.status,
        username = user.username,
        branch_id,
      } = request.post()

      let payload = {
        email,
        full_name,
        access_level,
        status,
        username,
        branch_id
      }

      if (password) {
        payload = {
          ...payload,
          password,
        }
      }

      user.merge(payload)

      await user.save()
      await user.load('branch')

      response.status(200).json({
        message: 'Successfully update user',
        data: user
      })

    } else {

      response.status(404).json({
        message: 'User not found',
        id
      })

    }
  }

  async delete ({ response, param: { id } }) {
    const user = await User.find(id)

    if (user) {
      await user.delete()

      response.status(200).json({
        message: 'Successfully delete user,',
        id
      })
    } else {
      response.status(404).json({
        message: 'User not found',
        id
      })
    }
  }
}

module.exports = UserController
