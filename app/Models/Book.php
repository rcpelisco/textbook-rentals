<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    use HasFactory;
    protected $fillable = [
        'title',
        'isbn_13',
        'isbn_10'
    ];
}
