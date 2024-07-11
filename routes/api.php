<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

Route::get('/authors', [AuthorController::class, 'index'])->name('authors');
Route::get('/authors/{id}', [AuthorController::class, 'get_one'])->name('get_one');
Route::post('/authors', [AuthorController::class, 'create'])->name('authors.create');
Route::patch('/authors', [AuthorController::class, 'udpate'])->name('authors.udpate');
Route::delete('/authors/{id}', [AuthorController::class, 'delete'])->name('authors.delete');

Route::get('/books', [BookController::class, 'index'])->name('books');
Route::get('/books/{id}', [BookController::class, 'get_one'])->name('books.get_one');
Route::post('/books', [BookController::class, 'create'])->name('books.create');
Route::patch('/books/{id}', [BookController::class, 'udpate'])->name('books.udpate');
Route::delete('/books/{id}', [BookController::class, 'delete'])->name('books.delete');