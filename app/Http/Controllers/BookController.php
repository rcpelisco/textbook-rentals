<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index() {
        return Book::paginate(10);
    }

    public function get_one(Request $request) {
        // return Book::get([id => $request->id]);
    }

    public function create(Request $request) {
        $data = $request->validate([
            'title' => 'required|min:3',
            'published' => 'required',
            'publisher' => 'required',
            'isbn_13' => 'required',
            'isbn_10' => 'required',
        ], [
            'title.required' => 'Book title should not be empty.',
            'title.min' => 'Please enter at least 3 characters.'
        ]);

        Book::create($data);

        return response('Book Created', 201);
    }

    public function update() {

    }

    public function delete() {}
}
