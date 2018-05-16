'use strict'

const User = use('App/Models/User')
const Store = use('App/Models/Store')
const Branch = use('App/Models/Branch')
class RegisterController {

  async store({ request, response}) {


    // Create Store
    var {name, email} = request.post().store
    var store = await Store.create({name, email})
    const store_id = store.id

    // Create Branches
    const branch_data = request.post().branch
    const new_branches = []
    for (let element of branch_data) {
      var {email, name, address} = element
      const branch = await Branch.create({email, name, address, store_id})
      new_branches.push(branch)
    }

    // HQ branch ID
    var branch_id = new_branches[0].id

    const user_data = request.post().user
    var {email, password, first_name, last_name, access_level, status, username} = user_data
    var user = await User.create({username, email, password, first_name, last_name, access_level, status, branch_id})

    response.status(201).json({
      message: 'Successfully created.',
      data: {"store": store, "branch" : new_branches, "user" : user}
    })
  }
}

module.exports = RegisterController
