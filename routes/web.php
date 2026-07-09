<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BusinessPartnersController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\InventoryTransactionsController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home')->middleware('customersonly');

Route::get('/register', function () {
    return Inertia::render('register');
})->name('register');

Route::get('/login', function () {
    return Inertia::render('login');
})->name('customerlogin');

Route::get('/products',function(){
    return Inertia::render('products');
})->name('products');

Route::get('/categories',function(){
    return Inertia::render('categories');
})->name('categories');

        // CUSTOMER SIDE CONTROL //

        // CUSTOMER REGISTER
Route::post('/register-customer',[CustomersController::class,'register'])->name('registercustomer');

        // CUSTOMER LOGIN
Route::post('/login-customer',[CustomersController::class,'login'])->name('customerslogin');

        // CUSTOMER LOGOUT
Route::post('/logout-customer',[CustomersController::class,'logout'])->name('customerslogout');


        // ADMIN SIDE CONTROL //

        // GO TO HOME
Route::get('/admin/',[AdminController::class,'home'])->name('adminhome')->middleware('staffonly');
Route::get('/admin/dashboard',[AdminController::class,'home'])->name('admindashboard')->middleware('staffonly');

        // GO TO LOGIN PAGE
Route::get('/admin/login',[AdminController::class,'gotologin'])->name('admin-login');

        // ADMIN LOGIN
Route::post('/admin/loginattempt',[AdminController::class,'login'])->name('adminloginattempt');
        // ADMIN LOGOUT
Route::post('/admin/logout',[AdminController::class,'adminlogout'])->name('adminlogout');

        // PRODUCT / ITEMS
        // ADD CATEGORY POST
Route::post('/admin/product/add-category',[ProductController::class,'adminAddCategory'])->name('addcategory')->middleware('staffonly');
        // ADD BRAND POST
Route::post('/admin/product/add-brand',[ProductController::class,'adminAddBrand'])->name('addbrand')->middleware('staffonly');
        // SAVE NEW PRODUCT
Route::post('/admin/product/add-product',[ProductController::class,'adminAddProduct'])->name('addproduct')->middleware('staffonly');
       // GO TO ADD VARIANTPAGE
Route::get('/admin/product/{slug}/variants/add',[ProductController::class,'goToCreateProductVariant'])->name('gotocreateproductvariant')->middleware('staffonly');
       // SAVE PRODUCT VARIANT
Route::post('/admin/product/{slug}/variants/save',[ProductController::class,'saveVariant'])->name('savevariant')->middleware('staffonly');
        // SAVE UOM / ADD UOM / CREATE UOM
Route::post('/admin/product/create-uom',[ProductController::class,'saveUom'])->name('adduom')->middleware('staffonly');

        // GO TO PRODUCT DETAILS PAGE WITH VARIANT LIST AND EDIT PRODUCT DETAILS OPTIONS
Route::get('/admin/product/{slug}/details',[ProductController::class,'goToProductVariantDetails'])->name('gotoproductvariantdetails')->middleware('staffonly'); 
        // GO TO VARIANT DETAILS WITH EDIT DETAILS OPTION
Route::get('/admin/product/{slug}/variants/{variantid}',[ProductController::class,'variantEditPage'])->name('variantEditPage')->middleware('staffonly');
        // SAVE VARIANT UPDATE
Route::put('/admin/product/{slug}/variants/{variantid}/save',[ProductController::class,'savechangesvariant'])->name('savechangesvariant')->middleware('staffonly');
        // SAVE PRODUCT UPDATE
Route::put('/admin/product/{slug}/save',[ProductController::class,'saveChanges'])->name('savechanges')->middleware('staffonly');


        //INVENTORY TRANSACTIONS
        // GO TO INVENTORY TRANSACTIONS
Route::get('/admin/inventory-transactions',[InventoryTransactionsController::class,'goToInventoryTransactionsPage'])->name('gotoinventorytransactionspage')->middleware('staffonly');
        // GO TO ADD NEW TRANSACTION
Route::get('/admin/inventory-transactions/new-transaction',[InventoryTransactionsController::class,'goToNewInventoryTransactions'])->name('gotonewinventorytransactions')->middleware('staffonly');

                // PURCHASE ORDER
        // GO TO PURCHASE ORDER PAGE
Route::get('/admin/purchase-orders',[InventoryTransactionsController::class,'goToPurchaseOrderPage'])->name('gotopurchaseorderpage')->middleware('staffonly');


        // BUSINESS PARTNERS
        // GO TO SUPPLIERS PAGE
Route::get('/admin/supplier/list',[BusinessPartnersController::class,'goToSuppliersPage'])->name('gotosupplierspage')->middleware('staffonly');
        // GO TO ADD SUPPLIERS PAGE
Route::get('/admin/supplier/new',[BusinessPartnersController::class,'goToSupplierAddPage'])->name('gotosupplieraddpage')->middleware('staffonly');
        // SAVE NEW SUPPLIER
Route::post('/admin/supplier/save',[BusinessPartnersController::class,'saveNewSupplier'])->name('savenewsupplier')->middleware('staffonly');
        // GO TO EDIT SUPPLIERS PAGE
Route::get('/admin/supplier/{id}/edit',[BusinessPartnersController::class,'editSupplierDetails'])->name('editsupplierdetails')->middleware('staffonly');
        // SAVE UPDATE ON SUPPLIERS DETAILS
Route::put('/admin/supplier/{id}/save-update',[BusinessPartnersController::class,'saveUpdateSuppliersDetails'])->name('saveupdatesuppliersdetails')->middleware('staffonly');

// search variange AJAX
Route::get('/admin/variants/search',[InventoryTransactionsController::class, 'searchVariant'])->name('seasrchvariant')->middleware('staffonly');

// GOTO ITEM MASTELIST
Route::get('/admin/product/list',[ProductController::class,'goToProductList'])->name('gotoproductlist')->middleware('staffonly');

Route::get('/admin/product/create',[ProductController::class,'addproduct'])->name('addproduct')->middleware('staffonly');



require __DIR__.'/settings.php';
//require __DIR__.'/auth.php';
