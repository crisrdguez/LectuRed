<?php

namespace App\Http\Controllers;

use App\Models\MiLista;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\MiListaResource;

class MiListaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $miLista = MiLista::all();

        return response()->json([
            'success' => true,
            'items' => MiListaResource::collection($miLista)
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        // Obtenemos el id del usuario logueado
        $user_id = auth()->user()->id;

        if ($request->idPersona) {
            $request->merge(['user_id' => $request->idPersona]);
            $request->request->remove('idPersona');
        }   

        // lo mismo con idLibro
        if ($request->idLibro) {
            $request->merge(['idlibro' => $request->idLibro]);
            $request->request->remove('idLibro');
        }
        
        // Si no se ha enviado el user_id o el user_id no es el del usuario logueado
        if (!$request->user_id || $request->user_id != $user_id) {
            $request->merge(['user_id' => auth()->user()->id]);
        }

        // el estado es obligatorio y el idlibro tambien
        if (!$request->estado || !$request->idlibro) {
            return response()->json([
                'success' => false,
                'message' => 'El estado y el idLibro son obligatorios'
            ], 200);
        }

        // Evaluamos si hay algún registro en la tabla MiLista con los mismos idlibro y el user_id
        $existe = MiLista::where('idlibro', $request->idlibro)->where('user_id', $request->user_id)->first();

        if($existe){
            return response()->json([
                'success' => false,
                'message' => 'El libro ya está en tu lista'
            ], 200);
        }

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

        // Si el estado del libro es distinto a leido no se puede poner una puntuacion ni una critica en caso de que venieran en la request
        if ($request->estado != 'leido' && ($request->puntuacion || $request->critica)) {
            return response()->json([
                'success' => false,
                'message' => 'No se puede poner una puntuación ni una crítica a un libro que no se ha leído'
            ], 200);
        }

        $miLista = MiLista::create($request->all());

        // Devolvemos el resoure MiListaResource con el registro que acabamos de crear
        return response()->json([
            'success' => true,
            'items' => new MiListaResource($miLista)
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $miLista = MiLista::where('user_id', $id)->get();

        return response()->json([
            'success' => true,
            'items' => MiListaResource::collection($miLista)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $idlibro): JsonResponse
    {

       // en la request nos llega el user_id como idPersona, tenemos que cambiarlo a user_id
           if ($request->idPersona) {
                $request->merge(['user_id' => $request->idPersona]);
                $request->request->remove('idPersona');
            }   

            // lo mismo con idLibro
            if ($request->idLibro) {
                $request->merge(['idlibro' => $request->idLibro]);
                $request->request->remove('idLibro');
            }
        // Si no se ha enviado el user_id o el user_id no es el del usuario logueado
        // Obtenemos el id del usuario logueado
        $user_id = auth()->user()->id;

        if (!$request->user_id || $request->user_id != $user_id) {
            $request->merge(['user_id' => auth()->user()->id]);
        }

        $camposNoPermitidos = $request->except(['user_id', 'idlibro', 'estado', 'puntuacion', 'critica']);

        if ($camposNoPermitidos) {
            $camposSeparadosPorComas = implode(', ', array_keys($camposNoPermitidos));

            return response()->json([
                'success' => false,
                'message' => 'Hay campos que no son susceptibles de actualizar'
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

        // Si el estado que nos llega en la request es distinto a leido los valores de los campos puntuacion y critica deben ser null si vienen en la request
        if ($request->estado != 'leido' && ($request->puntuacion || $request->critica)) {
            return response()->json([
                'success' => false,
                'message' => 'No se puede poner una puntuación ni una crítica a un libro que no se ha leído'
            ], 200);
        }

        // si el estado es distinto a leido, pero los campos puntuacion y critica no vienen en la request, los ponemos a null.

        if ($request->estado != 'leido' && !$request->puntuacion && !$request->critica) {
            $request->merge(['puntuacion' => null]);
            $request->merge(['critica' => null]);
        }

        // si en la request llegua el campo de puntuacion o el de critica comprobaremos si viene tambien el de estado y si es distinto a leido devolveremos un mensaje de que no se puede poner una puntuacion o una critica a un libro que no se ha leido. En caso de que el campo estado no venga en la request debemos consultar el estado que tiene el libro en la tabla MiLista y si es distinto a leido devolveremos un mensaje de que no se puede poner una puntuacion o una critica a un libro que no se ha leido.*/

        if (($request->puntuacion || $request->critica) && $request->estado && $request->estado != 'leido') {
            return response()->json([
                'success' => false,
                'message' => 'No se puede poner una puntuación ni una crítica a un libro que no se ha leído'
            ], 200);
        }

        if (($request->puntuacion || $request->critica) && !$request->estado) {
            $estado = MiLista::where('idlibro', $idlibro)->where('user_id', $user_id)->first()->estado;

            if ($estado != 'leido') {
                return response()->json([
                    'success' => false,
                    'message' => 'No se puede poner una puntuación ni una crítica a un libro que no se ha leído'
                ], 200);
            }
        }
        



        // Buscamos el registro por el idlibro
        $miLista = MiLista::where('idlibro', $idlibro)->first();
        $miLista->update($request->all());

        return response()->json([
            'success' => true,
            'items' => new MiListaResource($miLista)
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
