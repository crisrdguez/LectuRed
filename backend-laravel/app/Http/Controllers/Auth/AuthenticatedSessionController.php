<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Session;
use App\Models\MiLista;
use App\Models\Actividad;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
    
    return view('auth.login');

    }
    
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {

    // Realiza la autenticación utilizando la solicitud actual
        $request->authenticate();
        $request->session()->regenerate();

        // Obten el usuario autenticado
        $user = Auth::user();
        // cerrar sesion
        Auth::guard('web')->logout();
        // Redeirecciona a la ruta del front http://localhost:4200/home con el id del usuario
        return redirect()->intended('http://localhost:4200/home?id=' . $user->id);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        auth()->user()->tokens()->delete();

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }


    public function generarToken(Request $request)
    {
         $user = User::where('id', $request->id)->first();

        if ($user == null) {
            return response(['message' => 'Usuario no encontrado'], 404);
        }else{
            $token = $user->createToken('authToken')->plainTextToken;
            $usuario= User::find($request->id);
            $listasDelUsuario = MiLista::where('user_id', $request->id)->get();
            $actividaadesDelUsuario = Actividad::where('user_id', $request->id)->get();


        return response(['user' => $user, 'token' => $token, 'Mislibros' => $listasDelUsuario, 'Actividad del usuario' => $actividaadesDelUsuario]); 
        }
    } 

    public function logout()
    {
        //cerrar sesion
        Auth::guard('web')->logout();

        auth()->user()->tokens()->delete();
        return response(['message' => 'Session cerrada']);
    }
              
}
