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
    public function run(): void
    {
        MiLista::factory()->count(50)->create();

        // Recalcular la media después de sembrar
        MiLista::whereNotNull('puntuacion')->get()->groupBy('idlibro')->each(function ($group) {
            $idlibro = $group->first()->idlibro;
            $mediaPuntuacion = $group->avg('puntuacion');
            MiLista::where('idlibro', $idlibro)->update(['media_puntuacion' => $mediaPuntuacion]);
        });
    }
}
