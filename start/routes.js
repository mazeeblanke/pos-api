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

//user routes
Route.get('/users', 'UserController.index')
Route.get('/user/:id', 'UserController.show')
Route.post('/user', 'UserController.store')
Route.patch('/user/:id', 'UserController.update')
Route.delete('/user/:id', 'UserController.delete')

//user registeration
Route.post('/register','RegisterController.store').middleware(['findUserByEmail'])

//user login
Route.post('/login','LoginController.store').validator('StoreUser')

//settings
Route.get('/settings','SettingController.index').middleware(['authenticateToken'])
Route.post('/settings','SettingController.update').middleware(['authenticateToken'])

//sales
Route.get('/sales','SaleController.index').middleware(['authenticateToken'])
Route.post('/sales','SaleController.store').middleware(['authenticateToken'])
Route.get('/sale/:id','SaleController.show')

//products
Route.get('/products','ProductController.index')
Route.get('/product/:id', 'ProductController.show')
Route.post('/product', 'ProductController.check')
Route.post('/products', 'ProductController.store')

// 15949


// Customers
Route.get('/customers', 'CustomerController.index')
Route.get('/customers/:id', 'CustomerController.show')
Route.post('/customers', 'CustomerController.store')
Route.patch('/customer/:id', 'CustomerController.update')
Route.delete('/customer/:id', 'CustomerController.delete')
