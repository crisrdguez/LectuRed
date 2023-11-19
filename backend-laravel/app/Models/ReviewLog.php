<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReviewLog extends Model
{
    protected $guarded = [
        'id'
    ];

    // Define las relaciones si es necesario
    public function review()
    {
        return $this->belongsTo(Review::class, 'review_id');
    }
}
