<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ActividadMiLista;
use App\Models\User;

class MiLista extends Model
{
    use HasFactory;

    protected $table = 'mi_listas';
    protected $guarded = ['id'];

    protected static function booted()
    {
        static::saved(function ($miLista) {
            self::recalculateMediaPuntuacion($miLista);
        });

        static::deleted(function ($miLista) {
            self::recalculateMediaPuntuacion($miLista);
            self::deleteActividadMiLista($miLista);
        });

        static::creating(function ($miLista) {
            ActividadMiLista::create([
                'user_id' => auth()->user()->id,
                'nombre' => auth()->user()->name,
                'idlibro' => $miLista->idlibro,
                'puntuacion' => $miLista->puntuacion,
                'critica' => $miLista->critica,
                'estado' => $miLista->estado,
            ]);
        });

        static::updating(function ($miLista) {
            ActividadMiLista::create([
                'user_id' => auth()->user()->id,
                'nombre' => auth()->user()->name,
                'idlibro' => $miLista->idlibro,
                'puntuacion' => $miLista->puntuacion,
                'critica' => $miLista->critica,
                'estado' => $miLista->estado,
            ]);
        });

        static::deleting(function ($miLista) {
            self::deleteActividadMiLista($miLista);
        });

    }

    protected static function recalculateMediaPuntuacion($miLista)
    {
        $idlibro = $miLista->idlibro;

        // Calcular la suma de puntuación de todos los registros con estado 'leido' para ese idlibro
        $sumaPuntuacionLeidos = self::where('idlibro', $idlibro)
            ->where('estado', 'leido')
            ->sum('puntuacion');

        // Contar el número de registros con estado 'leido' para ese idlibro
        $numLeidos = self::where('idlibro', $idlibro)
            ->where('estado', 'leido')
            ->count();

        // Calcular la media de puntuación solo si hay al menos un registro con estado 'leido'
        $mediaPuntuacion = ($numLeidos > 0) ? $sumaPuntuacionLeidos / $numLeidos : null;

        // Actualizar la media de puntuación en la misma fila
        self::where('idlibro', $idlibro)->update(['media_puntuacion' => $mediaPuntuacion]);
    }

    protected static function deleteActividadMiLista($miLista)
    {
        // Eliminar registros en ActividadMiLista con el mismo usuario y idlibro
        ActividadMiLista::where('user_id', $miLista->user_id)
            ->where('idlibro', $miLista->idlibro)
            ->delete();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
