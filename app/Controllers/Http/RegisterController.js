'use strict'

const User = use('App/Models/User')
const Store = use('App/Models/Store')
const Branch = use('App/Models/Branch')
class RegisterController {

  async store({ request, response}) {


    var {name, email} = request.post().store
    var store = await Store.create({name, email})
    const store_id = store.id

    const branch_data = request.post().branch
    for (let element of branch_data) {
      var {email, name, address} = element
      const branch = await Branch.create({email, name, address, store_id})
    }

    var head_branch = await Branch.first()
    var branch_id = head_branch.id

    const user_data = request.post().user
    var {email, password, first_name, last_name, access_level, status, username} = user_data
    var user = await User.create({username, email, password, first_name, last_name, access_level, status, branch_id})

    response.json({
      message: 'Successfully created a new user.',
      data: head_branch
    })
  }
}

module.exports = RegisterController
