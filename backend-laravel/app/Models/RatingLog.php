<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RatingLog extends Model
{

    protected $guarded = ['id'];

    public function rating()
    {
        return $this->belongsTo(Rating::class, 'rating_id');
    }
}
