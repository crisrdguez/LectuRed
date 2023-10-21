<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function index()
    {
        $ratings = Rating::all();
        return response()->json($ratings);
    }

    public function show($id)
    {
        $rating = Rating::find($id);
        return response()->json($rating);
    }

    public function store(Request $request)
    {
        $rating = Rating::create($request->all());
        return response()->json($rating, 201);
    }

    public function update(Request $request, $id)
    {
        $rating = Rating::find($id);
        $rating->update($request->all());
        return response()->json($rating);
    }

    public function destroy($id)
    {
        Rating::find($id)->delete();
        return response()->json(null, 204);
    }
    
    public function book($id)
    {
        $book = Rating::find($id)->book;
        return response()->json($book);
    }
    
    public function user($id)
    {
        $user = Rating::find($id)->user;
        return response()->json($user);
    }
}
