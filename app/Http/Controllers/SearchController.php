<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SearchController extends Controller
{
     public function index(Request $request) {
        $query = $request['query'];
        if(Str::length($query) == 13) {
            $book = Book::with('authors')
                ->where('isbn_13', $query)
                ->first();
            if($book) return response()->json($book);
        }

        if(Str::length($query) == 10) {
            $book = Book::with('authors')
                ->where('isbn_10', $query)
                ->first();
            if($book) return response()->json($book);
        }

        $books = Book::with('authors')
            ->whereHas('authors', function (Builder $qb) use ($query) {
                $qb->where('name', 'like', '%'.$query.'%');
            })
            ->orWhere('title', 'like', '%'.$query.'%')
            ->orWhere('publisher', 'like', '%'.$query.'%')
            ->get();

        return response()->json($books);
     }
}
