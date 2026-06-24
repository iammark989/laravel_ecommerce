<?php

namespace App\Http\Controllers;


use App\Models\Brand;
use App\Models\Categorie;
use App\Models\Product;
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

    // GO TO ITEM MASTERLIST
    public function goToItemMasterlist(){
        $products = Product::orderBy('name','asc')->get();
                    {/** DB::raw(products as product)
                    ->select(
                        'product.id as id',
                        'product.name as name',
                        'product.featured_image as image',
                        'product.is_active as status',
                        'user.name as created_by',
                        'category.name as category'
                        'brand.name as brand',
                        'count(variants.sku) as variants',
                        ); */}

        
        return Inertia::render('admin/itemmasterlist',[
            'products' => $products,
        ]);
    }

    // GO TO ADD PRODUCT / ITEM
    public function addproduct(){
    $categories = Categorie::orderBy('name','asc')->get();
    $brands = Brand::orderBy('name','asc')->get();
    $products = Product::orderBy('name','asc')->get();
    return Inertia::render('admin/addnewitem',
    [ 'categories' => $categories, 'brands' => $brands, 'products' => $products]);
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

    // ADD BRAND
    public function adminAddBrand(Request $request){
        $incomingFields = $request->validate([
            'name' => 'required|string|max:30',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'description' => 'required|string|max:255',
        ]);
        $incomingFields['slug'] = Str::slug($incomingFields['name']);
            if(!$request->hasFile('logo')){
                 $incomingFields['logo'] = "";
            }else{
                $filename = Str::slug($incomingFields['name'])."logo".".jpg";
                $file = $request->file('logo');
                $file->move(public_path('files/brandlogos'), $filename);
                $incomingFields['logo'] = $filename;
            }
        
        Brand::create($incomingFields);
    }

    // ADD PRODUCT
    public function adminAddProduct(Request $request){
        $incomingFields = $request->validate([
            'category_id' => 'required',
            'brand_id' => 'required',
            'name' => 'required|string|max:50',
            'short_description' => 'required|max:255',
            'description' => 'required|max:1000',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_active' => 'required|boolean',
        ]);

            $user = auth()->user()->id;
        $incomingFields['slug'] = Str::slug($incomingFields['name']);
        $incomingFields['created_by'] = $user;

        $newProduct = Product::create($incomingFields);
        return redirect("/admin/products/{$newProduct->slug}/variants");

    }

    // GO TO VARIANT
        public function goToProductVariant($slug){
            $products = Product::where('slug','=',$slug)->firstOrFail();
            return Inertia::render('admin/addproductvariant',[
                'products' => $products,
            ]);
        }

}
