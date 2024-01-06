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

        // Si no hay datos en la tabla
        if ($miListas->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No hay libros'
            ], 200);
        } else {
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
        // Obtenemos el id del usuario logueado
        $user_id = auth()->user()->id;

        // Si no se ha enviado el user_id o el user_id no es el del usuario logueado
        if (!$request->user_id || $request->user_id != $user_id) {
            $request->merge(['user_id' => auth()->user()->id]);
        }

        // Comprobamos que en la request viene como mínimo el idlibro y el user_id
        // y si no, mostramos un mensaje que indique que son necesarios esos campos
        if (!$request->idlibro || !$request->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Los campos idlibro y user_id son necesarios para realizar un registro'
            ], 200);
        }

        // Evaluamos si hay algún registro en la tabla MiLista con los mismos idlibro y el user_id
        $existe = MiLista::where('idlibro', $request->idlibro)->where('user_id', $request->user_id)->first();

        // Comprobamos que en la request no vengan más campos de los siguientes:
        // user_id, idlibro, puntuacion, critica
        $camposNoPermitidos = $request->except(['user_id', 'idlibro', 'estado', 'puntuacion', 'critica']);

        if ($camposNoPermitidos) {
            $camposSeparadosPorComas = implode(', ', array_keys($camposNoPermitidos));

            return response()->json([
                'success' => false,
                'message' => 'Hay campos que no son susceptibles de registrar: ' . $camposSeparadosPorComas
            ], 200);
        }

        // Si el valor de la puntuacion no es un valor entre 0 y 5, devolvemos un mensaje de que la puntuacion debe ser un valor entre 0 y 5
        if ($request->puntuacion && !in_array($request->puntuacion, [0, 1, 2, 3, 4, 5])) {
            return response()->json([
                'success' => false,
                'message' => 'La puntuación debe ser un valor entre 0 y 5'
            ], 200);
        }

        // Evaluamos que el estado sea igual a leido, leyendo o deseado (mayúscula o minúscula)
        // Si no tiene alguno de esos 3 valores, devolvemos un mensaje de que el estado debe ser leido, leyendo o deseado
        if ($request->estado && !in_array(strtolower($request->estado), ['leido', 'leyendo', 'deseado'])) {
            return response()->json([
                'success' => false,
                'message' => 'El estado debe ser leido, leyendo o deseado'
            ], 200);
        }

        if ($existe) {
            return response()->json([
                'success' => false,
                'message' => 'El libro ya está en tu lista'
            ], 200);
        }

        // Si el estado del libro es distinto a leido no se puede poner una puntuacion ni una critica en caso de que venieran en la request
        if ($request->estado != 'leido' && ($request->puntuacion || $request->critica)) {
            return response()->json([
                'success' => false,
                'message' => 'No se puede poner una puntuación ni una crítica a un libro que no se ha leído'
            ], 200);
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
        $miLista = MiLista::where('user_id', $id)->get();

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
        // Si no se ha enviado el user_id o el user_id no es el del usuario logueado
        // Obtenemos el id del usuario logueado
        $user_id = auth()->user()->id;

        // Si el estado de la request es distinto a leido valoraremos si se ha enviado una puntuacion o una critica de así las modificaremos a null y si no vienen las añadiremos a la request con valor null
        if ($request->estado !== 'leido') {
            // Verificar si puntuacion está presente y establecer a null
            if ($request->has('puntuacion')) {
                $request->merge(['puntuacion' => null]);
            }

            // Verificar si critica está presente y establecer a null
            if ($request->has('critica')) {
                $request->merge(['critica' => null]);
            }
        }

        if (!$request->user_id || $request->user_id != $user_id) {
            $request->merge(['user_id' => auth()->user()->id]);
        }

        $camposNoPermitidos = $request->except(['user_id', 'idlibro', 'estado', 'puntuacion', 'critica']);

        if ($camposNoPermitidos) {
            $camposSeparadosPorComas = implode(', ', array_keys($camposNoPermitidos));

            return response()->json([
                'success' => false,
                'message' => 'Hay campos que no son susceptibles de actualizar: ' . $camposSeparadosPorComas
            ], 200);
        }

        // Evaluamos que el estado sea igual a leido, leyendo o deseado (mayúscula o minúscula)
        // Si no tiene alguno de esos 3 valores, devolvemos un mensaje de que el estado debe ser leido, leyendo o deseado
        if ($request->estado && !in_array(strtolower($request->estado), ['leido', 'leyendo', 'deseado'])) {
            return response()->json([
                'success' => false,
                'message' => 'El estado debe ser leido, leyendo o deseado'
            ], 200);
        }

        // Buscamos el registro por el idlibro
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
        $user_id = auth()->user()->id;

        // Lo que nos llega es el idlibro, tenemos que buscar el idlibro que pertenece a ese user_id y eliminarlo
        $miLista = MiLista::where('idlibro', $id)->where('user_id', $user_id)->first();
        $miLista->delete();

        return response()->json([
            'success' => true
        ], 200);
    }
}
