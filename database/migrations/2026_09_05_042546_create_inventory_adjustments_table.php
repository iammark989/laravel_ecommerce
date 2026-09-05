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
        Schema::create('inventory_adjustments', function (Blueprint $table) {
            $table->id();

            $table->string('adjustment_number')->unique();

            $table->foreignId('warehouse_id')
                ->constrained('warehouses');

            $table->date('adjustment_date');

            $table->string('reason');

            $table->string('status');

            $table->text('remarks')->nullable();

            $table->foreignId('created_by')
                ->constrained('users');

            $table->timestamp('posted_at')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_adjustments');
    }
};
