'use strict'

class Branches {
  get rules () { 
    const branches = this.ctx.request.post()

    if (branches) {
      return {
        'branches.*.name' : 'required|string',
        'branches.*.email' : 'required|email|unique:branches,email',
        'branches.*.address' : 'required|string',
        'branches.*.currency' : 'required',
        'branches.*.printout' : 'required|string'
      }
    }

    return {
      // validation rules
      'name' : 'required',
      'email' : 'required|email|unique:branches,email',
      'currency' : 'required',
      'printout' : 'required',
    }
  }


  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

  get messages() {
    return {
      'branches.*.name.required': '{{ field }} is required to create a new branch',
      'branches.*.email.required': '{{ field }} is required to create a new branch',
      'branches.*.email.email': '{{ field }} must be a valid email',
      'branches.*.address.required': '{{ field }} is required to create a new branch',
      'branches.*.currency.required': '{{ field }} is required to create a new branch',
      'branches.*.printout.required': '{{ field }} is required to create a new branch',
      'branches.*.address.string': '{{ field }} must be a string',
      'branches.*.printout.string': '{{ field }} must be a string'
    }

  }


}

module.exports = Branches
