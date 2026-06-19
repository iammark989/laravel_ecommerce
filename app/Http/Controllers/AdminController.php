<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    // GO TO ADMIN LOGIN PAGE
    public function login(){
        return Inertia::render('admin/login');
    }
}
