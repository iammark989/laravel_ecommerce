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
        Schema::create('purchase_order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_order_id')->constrained('purchase_orders');
            $table->foreignId('product_variant_id')->constrained('product_variants');
            $table->foreignId('uom_id')->constrained('uoms');
            $table->decimal('quantity',12,3);
            $table->decimal('cost_price',12,3);
            $table->decimal('amount',12,3);
            $table->decimal('conversion_qty',10,3);
            $table->decimal('received_qty',12,3)->default(0);
            $table->enum('tax_type',[
                'vatable',
                'vat_exempt',
                'zero_rated'
            ])->default('vatable');
            $table->foreignId('warehouse_id')->constrained('warehouses');
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_order_items');
    }
};
