<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::all();
        return response()->json($reviews);
    }

    public function show($id)
    {
        $review = Review::find($id);
        return response()->json($review);
    }

    public function store(Request $request)
    {
        $review = Review::create($request->all());
        return response()->json($review, 201);
    }

    public function update(Request $request, $id)
    {
        $review = Review::find($id);
        $review->update($request->all());
        return response()->json($review);
    }

    public function destroy($id)
    {
        Review::find($id)->delete();
        return response()->json(null, 204);
    }
    
    public function book($id)
    {
        $book = Review::find($id)->book;
        return response()->json($book);
    }
    
    public function user($id)
    {
        $user = Review::find($id)->user;
        return response()->json($user);
    }
}
