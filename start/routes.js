'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})


Route.get('/users', 'UserController.index')
Route.get('user/:id', 'UserController.show')
Route.post('/user', 'UserController.store')
Route.patch('user/:id', 'UserController.update')
Route.delete('user/:id', 'UserController.delete')

Route.post('/register','RegisterController.store').middleware(['findUserByEmail'])
Route.post('/login','LoginController.store')






// Customers
// Route.get('customers', 'CustomerController.index')
// Route.get('customers/:id', 'CustomerController.show')
// Route.post('customers', 'CustomerController.store')
// Route.patch('customers/:id', 'CustomerController.update')
// Route.delete('customers/:id', 'CustomerController.delete')
