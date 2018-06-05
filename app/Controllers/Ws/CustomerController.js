'use strict'

class CustomerController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onNew (customer) {
    this.socket.broadcast('new', 'customer here')
  }

}

module.exports = CustomerController
