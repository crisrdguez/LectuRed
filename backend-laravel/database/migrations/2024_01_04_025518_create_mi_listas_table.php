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
        Schema::create('mi_listas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('idlibro');
            $table->enum('estado', ['deseado', 'leyendo', 'leido']);
            $table->Integer('puntuacion')->check('rating >= 0 and rating <= 5')->nullable();
            $table->longText('critica')->nullable();
            $table->float('media_puntuacion')->nullable();
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users');
            $table->unique(['user_id', 'idlibro']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mi_listas');
    }
};
