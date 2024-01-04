<?php

namespace App\Http\Controllers;

use App\Models\MiLista;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MiListaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $miListas = MiLista::all();

        //si no hay datos en la tabla
        if ($miListas->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No hay libros'
            ], 200);
        }else{
            return response()->json([
                'success' => true,
                'data' => $miListas
            ], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        // validamos los datos y confirmamos que no exista un registro con el mismo idlibro y el mismo user_id
        $request->validate([
            'idlibro' => 'required|unique:mi_listas',
            'user_id' => 'required|unique:mi_listas'
        ]);
        // si no hay errores creamos el registro
        if($request->fails()){
            return response()->json([
                'success' => false,
                'message' => 'No se ha podido crear el registro'
            ], 400);
        }
        $miLista = MiLista::create($request->all());
        return response()->json([
            'success' => true,
            'data' => $miLista
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $miLista = MiLista::where('id', $id)->get();
        return response()->json([
            'success' => true,
            'data' => $miLista
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $idlibro): JsonResponse
    {
        // buscamos el el registro por el idlibro
        $miLista = MiLista::where('idlibro', $idlibro)->first();
        $miLista->update($request->all());
        return response()->json([
            'success' => true,
            'data' => $miLista
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $miLista = MiLista::find($id);
        $miLista->delete();
        return response()->json([
            'success' => true
        ], 200);
    }
}
