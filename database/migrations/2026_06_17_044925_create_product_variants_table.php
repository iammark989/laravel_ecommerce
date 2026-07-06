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
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained();

            $table->string('sku')->unique();;
            $table->string('barcode')->nullable()->unique();

            $table->decimal('cost_price',10,2);
            $table->foreignId('warehouse_id')->constrained('warehouses');

            $table->enum('tax_type', [
                'vatable',
                'vat_exempt',
                'zero_rated',
            ])->default('vatable');

            $table->foreignId('base_uom_id')->constrained('uoms');

            $table->foreignId('selling_uom_id')->constrained('uoms');

            $table->decimal('selling_qty',12,3)->default(1);

            $table->foreignId('purchasing_uom_id')->constrained('uoms');

            $table->decimal('purchasing_qty',12,3)->default(1);

            $table->string('variant_name')->unique();

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};
