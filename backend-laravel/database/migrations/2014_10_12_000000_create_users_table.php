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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('last_name');
            $table->date('birth_date')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('city')->nullable();
            $table->string('profile_image')->nullable();
            $table->string('social_media')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
            $table->softDeletes();
            $table->string('authentication_provider');
            $table->string('google_id')->nullable();
            $table->string('google_access_token')->nullable();
            $table->boolean('activity_visible')->default(true);
            $table->string('password_reset_token')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
