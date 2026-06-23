<?php

namespace App\Http\Controllers;


use App\Models\Categorie;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminController extends Controller
{

    // GO TO ADMIN HOME
    public function home(){
        return Inertia::render('admin/home');
    }

    // GO TO ADMIN LOGIN PAGE
    public function gotologin(){
        if(!auth()->user()){
        return Inertia::render('admin/login');
        }else{
        return redirect('/admin');
        }
    }

    // ADMIN LOGIN
    public function login(Request $request){
        $incomingFields = $request->validate([
            'username' => 'required|string|max:50',
            'password' => 'required',
        ]);

        if(Auth::attempt($incomingFields)){
            $user = User::where('username',$request->username)->firstOrFail();
            if(!$user->is_active){
                    throw ValidationException::withMessages([
                'errormsg' => ['Invalid username or password.'],
                ]);
            }else{
                $request->session()->regenerate();
                    return redirect('/admin');
            }
        }else{
            throw ValidationException::withMessages([
                'errormsg' => ['Invalid username or password.'],
                ]);
        }
    }

    // ADMIN LOGOUT
    public function adminlogout(Request $request){
         auth()->logout(); // if using Laravel auth

        $request->session()->invalidate(); // destroys session data
        $request->session()->regenerateToken(); // regenerate CSRF token

        return redirect()->intended('/admin/login');

    }



    //////////////      PRODUCT / ITEMS CONTROLLER //////////

    // GO TO ADD PRODUCT / ITEM
    public function addproduct(){

    $categories = Categorie::orderBy('name','asc')->get();
    return Inertia::render('admin/addnewitem',
    [ 'categories' => $categories]);
    }

    // ADD CATEGORY
    public function adminAddCategory(Request $request){
        $incomingFields = $request->validate([
            'name' => 'required|string|max:25',
            'description' => 'required|string|max:255',
        ]);

        $incomingFields['slug'] = Str::slug($incomingFields['name']);
        Categorie::create($incomingFields);


    }

}
