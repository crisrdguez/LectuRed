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
        Schema::create('review_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('review_id');
            $table->longText('content')->nullable();
            $table->enum('previous_book_status', ['desired', 'reading', 'read'])->nullable();
            $table->string('change_type'); 
            $table->string('update_field')->nullable();
            $table->timestamps();
    
            $table->foreign('review_id')->references('id')->on('reviews');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    
        Schema::table('review_logs', function (Blueprint $table) {
            $table->dropForeign(['review_id']);
        });
        Schema::dropIfExists('review_logs'); // la foreign key se elimina automaticamente
    }
};
