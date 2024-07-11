<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index() {
        return Book::with('authors')->paginate(10);
    }

    public function get_one(int $id) {
        $book = Book::where('id', $id)->first();

        if($book) {
            $authors = $book->authors();
            return response()->json($authors);
        }

        return response('Book not found', 404);
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


        $book = Book::create($data);

        $authors = Author::whereIn('id',$request->authors)->get();
        $book->authors()->saveMany($authors);
        $book->save();

        return response('Book Created', 201);
    }

    public function update() {

    }

    public function delete(int $id) {
        $book = Book::where('id', $id)->first();
        if($book) {
            $book->delete();
            return response('Book Deleted', 202);
        }
        return response('Book not found', 404);
    }
}
