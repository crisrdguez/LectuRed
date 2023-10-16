<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('books', 'BookController');
Route::resource('users', 'UserController');
Route::resource('ratings', 'RatingController');
Route::resource('reviews', 'ReviewController');
Route::resource('my-books', 'MyBookController');
