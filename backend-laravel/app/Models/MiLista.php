<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Actividad;
use App\Models\ActividadMiLista;

class MiLista extends Model
{
    use HasFactory;

    protected $table = 'mi_listas';
    protected $guarded = ['id'];

    protected static function booted()
    {

        static::saved(function ($miLista) {
            $idlibro = $miLista->idlibro;
            $mediaPuntuacion = self::where('idlibro', $idlibro)->avg('puntuacion');
    
            // Actualizar la media de puntuación en la misma fila
            self::where('idlibro', $idlibro)->update(['media_puntuacion' => $mediaPuntuacion]);
        });

        
        static::deleted(function ($miLista) {
            $idlibro = $miLista->idlibro;
            $mediaPuntuacion = self::where('idlibro', $idlibro)->avg('puntuacion');
    
            // Actualizar la media de puntuación en la misma fila
            self::where('idlibro', $idlibro)->update(['media_puntuacion' => $mediaPuntuacion]);
        });
        
        static::creating(function ($miLista) {
            ActividadMiLista::create([
                'user_id' => auth()->user()->id,
                'nombre' => auth()->user()->name,
                'idlibro' => $miLista->idlibro,
                'puntuacion'=> $miLista->puntuacion,
                'critica'=> $miLista->critica,
                'estado'=> $miLista->estado,
            ]);
        });
        static::updating(function ($miLista) {
           /*  $dirtyFields = $miLista->getDirty();
            foreach ($dirtyFields as $fieldName => $newValue) {
                $originalValue = $miLista->getOriginal($fieldName);
 */
                ActividadMiLista::create([
                    'user_id' => auth()->user()->id,
                    'nombre' => auth()->user()->name,
                    'idlibro' => $miLista->idlibro,
                    'puntuacion'=> $miLista->puntuacion,
                    'critica'=> $miLista->critica,
                    'estado'=> $miLista->estado,
                ]);
            //
        });
        

        static::deleting(function ($miLista) {
            ActividadMiLista::create([
                'user_id' => auth()->user()->id,
                'nombre' => auth()->user()->name,
                'idLibro' => $miLista->idlibro,
                'puntuacion'=> $miLista->puntuacion,
                'critica'=> $miLista->critica,
                'estado'=> $miLista->estado,
            ]);
        });
        
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}


/* Actividad::create([
    'user_id' => auth()->user()->id,
    'idlibro' => $miLista->idlibro,
    'nombre' => auth()->user()->name,
    'tipo' => 'Ha modificado',
    'campo_actualizado' => $fieldName,
    'valor_anterior' => $originalValue,
    'valor_nuevo' => $newValue,
]); */