<?php

namespace App\Http\Controllers;

use App\Models\MyBook;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MyBookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():JsonResponse
    {
        //esta funcion se encarga de mostrar todos los libros que tiene el usuario
        $MyBook = MyBook::all();
        return response()->json([
            'success' => true, 
            'data' => $MyBook
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request):JsonResponse
    {
        //esta funcion se encarga de guardar un nuevo libro en la base de datos
        $MyBook = MyBook::create($request->all());
        return response()->json([
            'success'=> true,
            'data'=> $MyBook
            ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id):JsonResponse
    {
        //esta funcion se encarga de mostrar un libro en especifico
        $MyBook = MyBook::find($id);
        return response()->json([
            'success'=> true,
            'data'=> $MyBook
            ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id):JsonResponse
    {
        //esta funcion se encarga de actualizar un libro en especifico
        $MyBook = MyBook::find($id);
        $MyBook->update($request->all());
        return response()->json([
            'success'=> true,
            'data'=> $MyBook
            ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id):JsonResponse
    {
        // Esta funcion se encarga de eliminar un libro en especifico
        $MyBook = MyBook::find($id);
        $MyBook->delete();
        return response()->json([
            'success'=> true
            ],200);
    }
}
