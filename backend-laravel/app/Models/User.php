<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'birth_date',
        'email',
        'password',
        'city',
        'profile_image',
        'social_media',
        'auth_provider',
        'google_id',
        'google_access_token',
        'activity_visible',
        'password_reset_token',
    ];

    public function books()
    {
        return $this->belongsToMany(Book::class, 'my_books', 'user_id', 'book_id')
            ->withPivot('status', 'soft_deleted')
            ->withTimestamps();
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class, 'user_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'user_id');
    }

    public function passwordResetTokens()
    {
        return $this->hasMany(PasswordResetToken::class);
    }

}
