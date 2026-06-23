<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomersController;
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
Route::get('/admin/home',[AdminController::class,'home'])->name('adminhome')->middleware('staffonly');

        // GO TO LOGIN PAGE
Route::get('/admin/login',[AdminController::class,'gotologin'])->name('admin-login');

        // ADMIN LOGIN
Route::post('/admin/loginattempt',[AdminController::class,'login'])->name('adminloginattempt');
        // ADMIN LOGOUT
Route::post('/admin/logout',[AdminController::class,'adminlogout'])->name('adminlogout');

        // ADD CATEGORY
Route::post('/admin/category/add',[AdminController::class,'adminAddCategory'])->name('addcategory')->middleware('staffonly');

Route::get('/admin/item-masterlist',function(){
    return Inertia::render('admin/itemmasterlist');
})->name('item_masterlist')->middleware('staffonly');

Route::get('/admin/product/create',[AdminController::class,'addproduct'])->name('addproduct')->middleware('staffonly');



require __DIR__.'/settings.php';
//require __DIR__.'/auth.php';
