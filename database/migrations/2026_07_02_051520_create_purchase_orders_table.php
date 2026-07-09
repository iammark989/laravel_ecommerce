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
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id();
            $table->string('po_number')->unique();
            $table->foreignId('supplier_id')->constrained('suppliers');
            $table->foreignId('warehouse_id')->constrained('warehouses');
            $table->date('order_date');
            $table->date('expected_delivery')->nullable();
            $table->enum('payment_terms',[
                'cash',
                'cod',
                'net15',
                'net30',
            ]);
            $table->enum('status',[
                'draft',
                'submitted',
                'completed',
                'cancelled',
                'partially_received',
            ]);
            $table->string('suppliers_quotation_no')->nullable();
            $table->string('reference_no')->nullable();
            $table->decimal('discount',12,2)->default(0);
            $table->decimal('tax',12,2)->default(0);
            $table->decimal('subtotal',12,2)->default(0);
            $table->decimal('grand_total',12,2)->default(0);
            $table->text('remarks')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('approved_by')->nullable()->constrained('users');
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('updated_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_orders');
    }
};
