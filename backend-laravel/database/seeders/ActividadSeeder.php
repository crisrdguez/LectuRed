<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MiLista;
use App\Models\ActividadMiLista;


class ActividadSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ActividadMiLista::create([
            'user_id' => 1,
            'nombre' => 'Noa',
            'idlibro' => 'hWSmEAAAQBAJ',
            'puntuacion' => 5,
            'critica' => 'El mejor libro del mundo...',
            'estado' => 'leido',
            'created_at' => '2024-01-19 17:01:45',
            'updated_at' => '2024-01-19 17:01:45',
        ]);
    
        ActividadMiLista::create([
            'user_id' => 2,
            'nombre' => 'Daniel',
            'idlibro' => 'YZseCgAAQBAJ',
            'puntuacion' => 0,
            'estado' => 'leyendo',
            'created_at' => '2024-01-19 17:02:33',
            'updated_at' => '2024-01-19 17:02:33',
        ]);
    
        ActividadMiLista::create([
            'user_id' => 3,
            'nombre' => 'Samuel',
            'idlibro' => 'DDHFEAAAQBAJ',
            'puntuacion' => 0,
            'estado' => 'deseado',
            'created_at' => '2024-01-19 17:03:05',
            'updated_at' => '2024-01-19 17:03:05',
        ]);
    
        ActividadMiLista::create([
            'user_id' => 4,
            'nombre' => 'Eduardo',
            'idlibro' => 't1slEAAAQBAJ',
            'puntuacion' => 5,
            'critica' => 'Una joya literaria que cautiva desde la primera página...',
            'estado' => 'leido',
            'created_at' => '2024-01-19 17:04:00',
            'updated_at' => '2024-01-19 17:04:00',
        ]);
    
        ActividadMiLista::create([
            'user_id' => 5,
            'nombre' => 'Ivan',
            'idlibro' => 'LsBkzwEACAAJ',
            'puntuacion' => 0,
            'estado' => 'leyendo',
            'created_at' => '2024-01-19 17:04:37',
            'updated_at' => '2024-01-19 17:04:37',
        ]);
    
        ActividadMiLista::create([
            'user_id' => 1,
            'nombre' => 'Noa',
            'idlibro' => 'YZseCgAAQBAJ',
            'puntuacion' => 4,
            'critica' => 'Este libro es una obra de arte literaria...',
            'estado' => 'leido',
            'created_at' => '2024-01-19 17:06:04',
            'updated_at' => '2024-01-19 17:06:04',
        ]);
    
        ActividadMiLista::create([
            'user_id' => 2,
            'nombre' => 'Daniel',
            'idlibro' => 'LsBkzwEACAAJ',
            'puntuacion' => 4,
            'critica' => 'Este libro es un tesoro literario...',
            'estado' => 'leido',
            'created_at' => '2024-01-19 17:11:42',
            'updated_at' => '2024-01-19 17:11:42',
        ]);
    
        ActividadMiLista::create([
            'user_id' => 3,
            'nombre' => 'Samuel',
            'idlibro' => 'LsBkzwEACAAJ',
            'puntuacion' => 5,
            'critica' => 'Un triunfo literario que deja una impresión imborrable...',
            'estado' => 'leido',
            'created_at' => '2024-01-19 17:12:51',
            'updated_at' => '2024-01-19 17:12:51',
        ]);
    }
}
