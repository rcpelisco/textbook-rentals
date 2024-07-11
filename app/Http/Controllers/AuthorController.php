<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthorController extends Controller
{

    public function index() {
        return Author::paginate(10);
    }

    public function view() {
        return Inertia::render('Authors', ['authors' => $this->index()]);
    }

    public function get_one() {

    }

    public function create(Request $request) {
        $data = $request->validate([
            'name' => 'required|min:3',
        ], [
            'name.required' => 'Author name should not be empty.',
            'name.min' => 'Please enter at least 3 characters.'
        ]);

        Author::create($data);

        return back()->with('message', 'Author Created');
    }

    public function update() {}

    public function delete() {}
}
