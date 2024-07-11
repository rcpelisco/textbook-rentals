<?php

use App\Http\Controllers\AuthorController;
use Illuminate\Support\Facades\Route;

Route::get('/authors', [AuthorController::class, 'index'])->name('authors');
Route::post('/authors', [AuthorController::class, 'create'])->name('authors.create');