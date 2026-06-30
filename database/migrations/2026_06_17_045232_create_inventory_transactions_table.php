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
            $table->foreignId('product_variant_id')->constrained();

            $table->enum('transaction_type', [
                'stock_in',
                'stock_out',
                'sale',
                'return',
                'damage',
                'adjustment'
            ]);

            $table->decimal('quantity',10,3);

            $table->string('reference_type')->nullable();
            $table->string('invoice_no')->nullable();
            $table->string('reference_id');
            

            $table->decimal('quantity',10,3);
            $table->decimal('stock_before',10,3);
            $table->decimal('stock_after',10,3);

            $table->text('remarks')->nullable();

            $table->unsignedBigInteger('created_by');

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
