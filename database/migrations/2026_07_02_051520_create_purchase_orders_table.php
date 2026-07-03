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
                'cancelled'
            ]);
            $table->string('suppliers_quotation_no')->nullable();
            $table->string('reference_no')->nullable();

            $table->decimal('total_amount',12,2)->default(0);
            $table->text('remarks')->nullable();
            $table->foreignId('created_by')->constrained('users');
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
