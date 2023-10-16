<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable = [
        'book_id',
        'title',
        'author',
        'thumbnail',
        'text_snippet',
        'isbn',
        'publisher',
        'category',
        'page_count',
        'language',
        'publication_date',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'my_books', 'book_id', 'user_id')
            ->withPivot('status', 'soft_deleted')
            ->withTimestamps();
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class, 'book_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'book_id');
    }

}
