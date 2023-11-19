<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserLog extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $table = 'user_logs';
}
