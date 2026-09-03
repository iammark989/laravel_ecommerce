<?php

use App\Http\Controllers\InventoryController;
use App\Http\Controllers\InventoryTransactionsController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get(
    '/search/purchase-orders',
    [SearchController::class, 'purchaseOrders']
);

Route::get(
    '/purchase-orders/{purchaseOrder}/details',
    [PurchaseOrderController::class, 'purchaseOrdersDetails']
);

Route::get(
    '/inventory',
    [InventoryController::class, 'index']
);

Route::get('/inventory-transactions', [InventoryTransactionsController::class, 'index']);

Route::get('/inventory-transactions/{inventoryTransaction}',[InventoryTransactionsController::class, 'show']);
