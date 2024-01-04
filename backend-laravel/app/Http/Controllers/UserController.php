<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
      $user=User::all();
      return response()->json([
          'success' => true,
          'data'=> $user
      ],200);  
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request):JsonResponse 
    // el store es para guardar un nuevo registro lo que recibe es un request y lo que devuelve es un json con el registro creado
    {
        $user=User::create($request->all());
        return response()->json(['success'=>true,'data'=>$user],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id):JsonResponse
    {
        // esta funcion es para mostrar un registro en especifico
        $user=User::find($id);
        return response()->json(['success'=>true,'data'=>$user],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //estaa funcion es para actualizar un registro en especifico
        $user=User::find($id);
        $user->update($request->all());
        return response()->json(['success'=>true,'data'=>$user],200);   
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //este metodo es para eliminar un registro en especifico
        $user=User::find($id);
        $user->delete();
        return response()->json(['success'=>true,],200);
    }

    public function googleRedirect()
    {
        return Socialite::driver('google')->redirect();
    }
    
    public function googleCallback()
    {
        $user = Socialite::driver('google')->user();
        
        $user = User::updateOrCreate([
            'google_id' => $user->id,
        ], [
            'name' => $user->user['given_name'],
            'last_name' => $user->user['family_name'],
            'email' => $user->user['email'],
            'profile_image'=>$user->user['picture'],
            'google_acces_token'=>$user->token,
            'authentication_provider'=>'google',

        ]);
        Auth::login($user); 
        $usuario= Auth()->user();
        return redirect()->intended('http://localhost:4200/home?id=' . $usuario->id);
    }

}
