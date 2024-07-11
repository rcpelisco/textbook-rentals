<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

Route::get('/authors', [AuthorController::class, 'index'])->name('api.authors');
Route::get('/authors/{id}', [AuthorController::class, 'get_one'])->name('api.authors.get_one');
Route::post('/authors', [AuthorController::class, 'create'])->name('api.authors.create');
Route::patch('/authors', [AuthorController::class, 'udpate'])->name('api.authors.udpate');
Route::delete('/authors/{id}', [AuthorController::class, 'delete'])->name('api.authors.delete');

Route::get('/books', [BookController::class, 'index'])->name('api.books');
Route::get('/books/{id}', [BookController::class, 'get_one'])->name('api.books.get_one');
Route::post('/books', [BookController::class, 'create'])->name('api.books.create');
Route::patch('/books/{id}', [BookController::class, 'udpate'])->name('api.books.udpate');
Route::delete('/books/{id}', [BookController::class, 'delete'])->name('api.books.delete');

Route::get('/search', [SearchController::class, 'index'])->name('api.search');