<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show($id)
    {
        $user = User::find($id);
        return response()->json($user);
    }

    public function store(Request $request)
    {
        $user = User::create($request->all());
        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->update($request->all());
        return response()->json($user);
    }

    public function destroy($id)
    {
        User::find($id)->delete();
        return response()->json(null, 204);
    }
    
    public function books($id)
    {
        $books = User::find($id)->books;
        return response()->json($books);
    }
    
    public function ratings($id)
    {
        $ratings = User::find($id)->ratings;
        return response()->json($ratings);
    }
    
    public function reviews($id)
    {
        $reviews = User::find($id)->reviews;
        return response()->json($reviews);
    }
    
    public function passwordResetTokens($id)
    {
        $passwordResetTokens = User::find($id)->passwordResetTokens;
        return response()->json($passwordResetTokens);
    }
}
