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

// user login
Route.post('/login','LoginController.store').validator('StoreUser')

// Settings
Route.get('/settings','SettingController.index').middleware(['authenticateToken'])
Route.post('/settings','SettingController.update').middleware(['authenticateToken'])

// sales
Route.get('/sales','SaleController.index').middleware(['authenticateToken'])
Route.post('/sales','SaleController.store').middleware(['authenticateToken'])
Route.get('/sales/:id','SaleController.show')

//Sales history
Route.get('/sales-history','SaleHistoryController.index').middleware(['authenticateToken'])
Route.get('/sales-history/:id','SaleHistoryController.show').middleware(['authenticateToken'])

// Refunds
Route.get('/refunds', 'RefundController.index')
Route.post('/refunds', 'RefundController.store')

// Products
Route.get('/products','ProductController.index').middleware(['authenticateToken'])
Route.get('/product/:id', 'ProductController.show').middleware(['authenticateToken'])
Route.post('/product', 'ProductController.check').middleware(['authenticateToken'])
Route.post('/products', 'ProductController.store').validator('Products').middleware(['authenticateToken'])

// Product Inquiry
Route.get('/productinquiry', 'ProductInquiryController.index')
Route.patch('/productinquiry/:id', 'ProductInquiryController.update')
Route.post('/productinquiry', 'ProductInquiryController.store')

// Product Transfer
Route.get('/producttransfer', 'ProductTransferController.index')
Route.post('/producttransfer', 'ProductTransferController.store')

// Branch
Route.get('/branches', 'BranchController.index')
Route.get('/branch/:id', 'BranchController.show')
Route.patch('/branch/:id', 'BranchController.update')
Route.post('/branches', 'BranchController.store').validator('Branches')

//supplier
Route.get('/suppliers', 'SupplierController.index')
Route.get('/suppliers/:id', 'SupplierController.show')
Route.patch('/supplier/:id', 'SupplierController.update')
Route.post('/suppliers', 'SupplierController.store').validator('Branches')

// Customers
Route.get('/customers', 'CustomerController.index')
Route.get('/customers/:id', 'CustomerController.show')
Route.post('/customers', 'CustomerController.store').validator('Customers')
Route.patch('/customer/:id', 'CustomerController.update')
Route.delete('/customer/:id', 'CustomerController.delete')

Route.get('/dashboard/stats', 'DashboardController.stats').middleware(['authenticateToken'])

// Passwword
Route.post('/password/emailcode', 'PasswordController.sendResetLinkEmail')
Route.post('/password/resetpassword', 'PasswordController.resetPassword')


// Expenditure
Route.get('/expenditures', 'ExpenditureController.index')
Route.post('/expenditures', 'ExpenditureController.store')


// Opening Cash
Route.get('/openingcash', 'OpeningcashController.index')
Route.post('/openingcash', 'OpeningcashController.store')

// Banking Cash
Route.get('/bankingcash', 'BankingcashController.index')
Route.post('/bankingcash', 'BankingcashController.store')

Route.get('/reports', 'ReportController.index')