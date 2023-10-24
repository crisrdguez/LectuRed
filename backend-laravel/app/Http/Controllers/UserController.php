<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
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
        return redirect()->route('dashboard');
        
    }

}
