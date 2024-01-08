<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActividadMiLista extends Model
{
    use HasFactory;

    protected $table = 'actividad_mi_listas';
    protected $guarded = ['id'];
}
