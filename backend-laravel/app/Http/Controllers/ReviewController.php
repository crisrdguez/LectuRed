<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use App\Events\ReviewUpdated;
use Illuminate\Http\JsonResponse;
use Whoops\Run;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        //esta funcion se encarga de mostrar todos los libros que tiene el usuario
        $review=Review::all();
        return response()->json([
        'success' => true,
        'data' => $review
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request):JsonResponse
    {

        $review=Review::create($request->all());
        event(new ReviewUpdated($review));
        return response()->json([
            'success'=> true,
            'data'=> $review
            ],201); 
            
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $review=Review::find($id);
        return response()->json([
            'success'=> true,
            'data'=> $review
            ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id):JsonResponse
    {
        $review=Review::find($id);
        $reviewOriginal = Review::find($id);
        $reviewUpdated = $request->all();
        $changedFields = [];
        foreach ($reviewUpdated as $fieldName => $updatedValue) {
            $originalValue = $reviewOriginal->$fieldName;
            // Comparar el valor actualizado con el valor original
            if ($originalValue != $updatedValue) {
                $changedFields[] = $fieldName;
            }
        }
        $review->update($request->all());
        event(new ReviewUpdated($review, $changedFields));
        return response()->json([
            'success'=> true,
            'data'=> $review
            ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id):JsonResponse
    {
        $review = Review::find($id);
        $review->delete();
        event(new ReviewUpdated($review));
        return response()->json([
            'success' => true,
        ], 200);

    }
}
