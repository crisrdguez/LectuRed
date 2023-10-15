<?php

namespace App\Models;

use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Rating extends Model
{
    use HasFactory;
    protected $fillable = [
        'book_id',
        'user_id',
        'rating',
        'previous_book_status',
    ];

    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public static $rules = [
        'rating' => [
            'required',
            'integer',
            Rule::in([1, 2, 3, 4, 5]),
        ],
    ];

}
