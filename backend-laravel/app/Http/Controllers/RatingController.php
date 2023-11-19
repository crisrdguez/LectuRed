<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $rating=Rating::all();
        return response()->json([
            'success' => true,
            'data'=> $rating
        ],200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // esta funcion es para guardar un nuevo registro lo que recibe es un request y lo que devuelve es un json con el registro creado
        $rating=Rating::create($request->all());
        return response()->json([
        'success'=> true,
        'data'=> $rating
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $rating=Rating::find($id);
        return response()->json([
            'success'=> true,
            'data'=> $rating
            ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //esta funcion es para actualizar un registro en especifico
        $rating=Rating::find($id);
        $rating->update($request->all());   
        return response()->json([
            'success'=> true,
            'data'=> $rating
            ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // esta funcion es para eliminar un registro en especifico
        $rating=Rating::find($id);
        $rating->delete();
        return response()->json([
            'success'=> true,
            ],200);
    }
}
