<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index() {
        return Book::with('authors')->paginate(10);
    }

    public function view() {
        return Inertia::render('Books/index', ['books' => $this->index(), 'authors' => Author::all(['id', 'name'])]);
    }

    public function view_book(int $id) {
    return Inertia::render('Books/view', ['id' => $id]);
    }

    public function get_one(int $id) {
        $book = Book::with('authors')->where('id', $id)->first();

        if($book) {
            return response()->json($book);
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

        $book = Book::with('author')->where('id', $book->id)->first();

        return response()->json($book);
    }

    public function update(Request $request) {
        $book = Book::where('id', $request->id);
        return response()->json($book);
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
