<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventory_transactions', function (Blueprint $table) {
            $table->id();

            $table->enum('transaction_type', [
                'stock_in',
                'stock_out',
                'adjustment'
            ]);

            $table->enum('reason',[
                'Supplier Delivery',
                'Customer Return',
                'Initial Stock',
                'Transfer In',
                'Stock Correction',
                'Other',
                'Sale',
                'Damage',
                'Expired',
                'Transfer Out',
                'Lost',
                'Sample',
                'Physical Count',
                'Inventory Audit',
                'Correction',
                'System Adjustment',
            ]);

            $table->String('status');

            $table->string('reference_type')->nullable();
            $table->string('invoice_no')->nullable();
            $table->string('reference_number');
            
            $table->text('remarks')->nullable();

            $table->unsignedBigInteger('created_by');

            $table->timestamp('posted_at');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_transactions');
    }
};
