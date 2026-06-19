<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class adminonly
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!auth()->check()){
            return redirect('/admin/login')->with('failed','You must be logged in!');
        }

        if(auth()->user()->is_admin === 0){
            abort(403);
        }

            return $next($request);
        
    }
}
