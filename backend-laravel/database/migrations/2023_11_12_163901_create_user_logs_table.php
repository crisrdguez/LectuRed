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
        Schema::create('user_logs', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('last_name', 255)->nullable();
            $table->date('birth_date')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('city')->nullable();
            $table->string('profile_image')->nullable();
            $table->string('social_media')->nullable();
            $table->string('google_id')->nullable();
            $table->string('google_access_token')->nullable();
            $table->boolean('activity_visible')->default(true);
            $table->string('authentication_provider')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();

            // Puedes añadir más campos si es necesario
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_logs');
    }
};
