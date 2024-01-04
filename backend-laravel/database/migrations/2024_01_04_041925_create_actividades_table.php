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
            Schema::create('actividades', function (Blueprint $table) {
                $table->id();
                $table->string('idlibro');
                $table->string('user_id');
                $table->string('nombre');
                $table->enum('tipo',['Ha añadido', 'Ha eliminado','Ha modificado']);
                $table->enum('campo_actualizado',['estado','puntuacion','critica','libro']);
                $table->string('valor_anterior')->nullable();
                $table->string('valor_nuevo')->nullable();
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('actividades');
        }
    };
