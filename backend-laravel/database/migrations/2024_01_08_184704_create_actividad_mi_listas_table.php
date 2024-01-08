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
        Schema::create('actividad_mi_listas', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('nombre');
            $table->string('idlibro');
            $table->Integer('puntuacion')->check('rating >= 0 and rating <= 5')->nullable();
            $table->longText('critica')->nullable();
            $table->enum('estado', ['deseado', 'leyendo', 'leido']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actividad_mi_listas');
    }
};
