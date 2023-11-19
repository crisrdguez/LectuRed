<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():JsonResponse
    {
        //etsta funcion es para mostrar todos los registros
        $books = Book::all();
        return response()->json([
            'success' => true,
            'data'=> $books
        ],200);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //esta funcion es para guardar un nuevo registro lo que recibe es un request y lo que devuelve es un json con el registro creado
        $book = Book::create($request->all());
        return response()->json([
            'success'=> true,
            'data'=> $book
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // esta funcion es para mostrar un registro en especifico
        $book = Book::find($id);
        return response()->json([
            'success'=> true,
            'data'=> $book
            ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // esta funcion es para actualizar un registro en especifico
        $book = Book::find($id);
        $book->update($request->all());
        return response()->json([
            'success'=> true,
            'data'=> $book
            ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // esta funcion es para eliminar un registro en especifico
        $book = Book::find($id);
        $book->delete();
        return response()->json([
            'success'=> true,
            ]);
    }
}
