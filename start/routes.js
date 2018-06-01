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
  return { greeting: 'Multi-Store POS JSON API' }
})

//user routes
Route.get('/users', 'UserController.index')
Route.get('/user/:id', 'UserController.show')
Route.post('/users', 'UserController.store').validator('StoreUser')
Route.patch('/user/:id', 'UserController.update')
// Route.delete('/user/:id', 'UserController.delete')

//user registeration
Route.post('/register','RegisterController.store').validator('RegisterCompany')

//user login
Route.post('/login','LoginController.store').validator('StoreUser')

//settings
Route.get('/settings','SettingController.index').middleware(['authenticateToken'])
Route.post('/settings','SettingController.update').middleware(['authenticateToken'])

//sales
Route.get('/sales','SaleController.index').middleware(['authenticateToken'])
Route.post('/sales','SaleController.store').middleware(['authenticateToken'])
Route.get('/sale/:id','SaleController.show')

//Sales history
Route.get('/sales-history','SaleHistoryController.index').middleware(['authenticateToken'])
Route.get('/sales-history/:id','SaleHistoryController.show').middleware(['authenticateToken'])

//Refunds
Route.get('/refunds', 'RefundController.index')
Route.post('/refunds', 'RefundController.store')

//products
Route.get('/products','ProductController.index').middleware(['authenticateToken'])
Route.get('/product/:id', 'ProductController.show').middleware(['authenticateToken'])
Route.post('/product', 'ProductController.check').middleware(['authenticateToken'])
Route.post('/products', 'ProductController.store').validator('Products').middleware(['authenticateToken'])


//Product Inquiry
Route.get('/productinquiry', 'ProductInquiryController.index')
Route.post('/productinquiry', 'ProductInquiryController.store')

//branch
Route.get('/branches', 'BranchController.index')
Route.get('/branch/:id', 'BranchController.show')
Route.patch('/branch/:id', 'BranchController.update')
Route.post('/branches', 'BranchController.store').validator('Branches')

// Customers
Route.get('/customers', 'CustomerController.index')
Route.get('/customers/:id', 'CustomerController.show')
Route.post('/customers', 'CustomerController.store').validator('Customers')
Route.patch('/customer/:id', 'CustomerController.update')
Route.delete('/customer/:id', 'CustomerController.delete')


//passwword
Route.post('/password/emailcode', 'PasswordController.sendResetLinkEmail')
Route.post('/password/resetpassword', 'PasswordController.resetPassword')
