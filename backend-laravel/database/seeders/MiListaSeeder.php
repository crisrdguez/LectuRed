<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MiLista;
use App\Models\Actividad;

class MiListaSeeder extends Seeder
{

    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    /* En caso de usar factories hay que hacerlo sin evento y una vez creados los registros recalcular la media de puntuación */
    /*     
    public function run(): void
    {
        MiLista::factory()->count(50)->create();

        // Recalcular la media después de sembrar
        MiLista::whereNotNull('puntuacion')->get()->groupBy('idlibro')->each(function ($group) {
            $idlibro = $group->first()->idlibro;
            $mediaPuntuacion = $group->avg('puntuacion');
            MiLista::where('idlibro', $idlibro)->update(['media_puntuacion' => $mediaPuntuacion]);
        });
    } */

    public function run()
   {
    MiLista::create([
        'user_id' => 1,
        'idlibro' => 'hWSmEAAAQBAJ',
        'estado' => 'leido',
        'puntuacion' => 5,
        'critica' => 'El mejor libro del mundo...',
        'media_puntuacion' => 5.00,
        'created_at' => '2024-01-19 17:01:45',
        'updated_at' => '2024-01-19 17:01:45',
    ]);

    MiLista::create([
        'user_id' => 2,
        'idlibro' => 'YZseCgAAQBAJ',
        'estado' => 'leyendo',
        'puntuacion' => 0,
        'media_puntuacion' => 4.00,
        'created_at' => '2024-01-19 17:02:33',
        'updated_at' => '2024-01-19 17:06:04',
    ]);

    MiLista::create([
        'user_id' => 3,
        'idlibro' => 'DDHFEAAAQBAJ',
        'estado' => 'deseado',
        'created_at' => '2024-01-19 17:03:05',
        'updated_at' => '2024-01-19 17:03:05',
    ]);

    MiLista::create([
        'user_id' => 4,
        'idlibro' => 't1slEAAAQBAJ',
        'estado' => 'leido',
        'puntuacion' => 5,
        'critica' => 'Una joya literaria que cautiva desde la primera página...',
        'media_puntuacion' => 5.00,
        'created_at' => '2024-01-19 17:04:00',
        'updated_at' => '2024-01-19 17:04:00',
    ]);

    MiLista::create([
        'user_id' => 5,
        'idlibro' => 'LsBkzwEACAAJ',
        'estado' => 'leyendo',
        'puntuacion' => 0,
        'media_puntuacion' => 4.50,
        'created_at' => '2024-01-19 17:04:37',
        'updated_at' => '2024-01-19 17:12:51',
    ]);

    MiLista::create([
        'user_id' => 1,
        'idlibro' => 'YZseCgAAQBAJ',
        'estado' => 'leido',
        'puntuacion' => 4,
        'critica' => 'Este libro es una obra de arte literaria...',
        'media_puntuacion' => 4.00,
        'created_at' => '2024-01-19 17:06:04',
        'updated_at' => '2024-01-19 17:06:04',
    ]);

    MiLista::create([
        'user_id' => 2,
        'idlibro' => 'LsBkzwEACAAJ',
        'estado' => 'leido',
        'puntuacion' => 4,
        'critica' => 'Este libro es un tesoro literario...',
        'media_puntuacion' => 4.50,
        'created_at' => '2024-01-19 17:11:42',
        'updated_at' => '2024-01-19 17:12:51',
    ]);

    MiLista::create([
        'user_id' => 3,
        'idlibro' => 'LsBkzwEACAAJ',
        'estado' => 'leido',
        'puntuacion' => 5,
        'critica' => 'Un triunfo literario que deja una impresión imborrable...',
        'media_puntuacion' => 4.50,
        'created_at' => '2024-01-19 17:12:51',
        'updated_at' => '2024-01-19 17:12:51',
    ]);
   } 
}
