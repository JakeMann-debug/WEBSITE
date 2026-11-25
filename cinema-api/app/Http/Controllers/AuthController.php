<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use app\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function Register(Request $request){
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users.email',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password'])
        ]);
        $token = $user->createToken('nextjs_token')->plainTextToken;

        return response(['user'=>$user, 'token'=>$token]);
    }
    
    public function Login(Request $request){
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' =>'required|string'
        ]);
        $user = User::where('email',$fields['email']) -> first();
        
        if(!$user ||!Hash::check($fields['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' =>['The provideed credential are incorrect.']
            ]);
        }

        $token = $user->createToken('nextjs_token')->plainTextToken;

        return response(['user'=>$user, 'token'=>$token], 200);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response(['message'=> 'Logged out successfully'], 200);
    }

    
}
