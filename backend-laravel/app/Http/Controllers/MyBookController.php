<?php

namespace App\Http\Controllers;

use App\Models\MyBook;
use Illuminate\Http\Request;

class MyBookController extends Controller
{
    public function index()
    {
        $myBooks = MyBook::all();
        return response()->json($myBooks);
    }

    public function show($id)
    {
        $myBook = MyBook::find($id);
        return response()->json($myBook);
    }

    public function store(Request $request)
    {
        $myBook = MyBook::create($request->all());
        return response()->json($myBook, 201);
    }

    public function update(Request $request, $id)
    {
        $myBook = MyBook::find($id);
        $myBook->update($request->all());
        return response()->json($myBook);
    }

    public function destroy($id)
    {
        MyBook::find($id)->delete();
        return response()->json(null, 204);
    }
    
    public function user($id)
    {
        $user = MyBook::find($id)->user;
        return response()->json($user);
    }
    
    public function book($id)
    {
        $book = MyBook::find($id)->book;
        return response()->json($book);
    }
}
