<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    
    protected $table = 'books';

    protected $fillable = [
        'title',
        'published',
        'publisher',
        'isbn_13',
        'isbn_10',
    ];
}
