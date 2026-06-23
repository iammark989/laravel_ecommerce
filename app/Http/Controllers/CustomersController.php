<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserAddresse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class CustomersController extends Controller
{
        // CUSTOMER LOGIN //
    public function login(Request $request){
            $incomingFields = $request->validate([
                'email' => 'required|email',
                'password' => 'required', 
            ]);
        
            if(Auth::attempt($incomingFields)){
                $user = User::where('email',$request->email)->firstOrFail();
                if(!$user->is_active){
                     throw ValidationException::withMessages([
                'errormsg' => ['Invalid username or password.'],
                ]);
                }else{
                    $request->session()->regenerate();
                    return redirect('/');
                };
            }else{
                throw ValidationException::withMessages([
                'errormsg' => ['Invalid username or password.'],
                ]);
            };
    }

        // LOGOUT
    public function logout(Request $request){
         auth()->logout(); // if using Laravel auth

        $request->session()->invalidate(); // destroys session data
        $request->session()->regenerateToken(); // regenerate CSRF token

        return redirect()->intended('/');
    }

        // CUSTOMER REGISTER //
    public function register(Request $request){
        $incomingFields = $request->validate([
            'first_name' => 'required|string|max:50',
            'middle_name' => 'nullable|string|max:50',
            'last_name' => 'required|string|max:50',
            'suffix' => 'nullable|string|max:50',
            'mobile' => 'required|string|max:25',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|min:8|confirmed|max:16',
            'address_line' => 'required|string|max:100',
            'barangay' => 'required|string|max:50',
            'city' => 'required|string|max:50',
            'province' => 'required|string|max:50',
            'postal_code' => 'required|string|max:25',
        ]);


            DB::transaction(function () use ($request, $incomingFields) {

                $incomingFields['username'] = $request->email;
                $incomingFields['role_id'] = "1";
                $incomingFields['password'] = Hash::make($request->password);

                $user = User::create($incomingFields);

                UserAddresse::create([
                    'user_id' => $user->id,
                    'address_line' => $request->address_line,
                    'barangay' => $request->barangay,
                    'city' => $request->city,
                    'province' => $request->province,
                    'postal_code' => $request->postal_code,
                    'is_default' => true,
                ]);
            });
    }



}
