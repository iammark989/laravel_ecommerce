<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

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


        // GO TO LOGIN PAGE
Route::get('/admin',[AdminController::class,'login'])->name('admin-login');


Route::get('/admin/item-masterlist',function(){
    return Inertia::render('admin/itemmasterlist');
})->name('item_masterlist')->middleware('staffonly');

Route::get('/admin/add-item',function(){
    return Inertia::render('admin/addnewitem');
})->name('item_add')->middleware('staffonly');



require __DIR__.'/settings.php';
//require __DIR__.'/auth.php';
