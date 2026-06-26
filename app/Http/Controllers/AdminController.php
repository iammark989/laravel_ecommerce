<?php

namespace App\Http\Controllers;


use App\Models\Brand;
use App\Models\Categorie;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\User;
use App\Models\VariantInventorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        $products = DB::table('products as product')
            ->leftJoin('categories as category', 'category.id', '=', 'product.category_id')
            ->leftJoin('brands as brand', 'brand.id', '=', 'product.brand_id')
            ->leftJoin('users as user', 'user.id', '=', 'product.created_by')
            ->leftJoin(
                'product_variants as variants',
                'variants.product_id',
                '=',
                'product.id'
            )
            ->select(
                'product.id',
                'product.name',
                'product.featured_image as image',
                'product.is_active as status',
                'user.username as created_by',
                'category.name as category',
                'brand.name as brand',
                DB::raw('COUNT(variants.id) as variants')
            )
            ->groupBy(
                'product.id',
                'product.name',
                'product.featured_image',
                'product.is_active',
                'user.username',
                'category.name',
                'brand.name'
            )
            ->get();

        
        return Inertia::render('admin/itemmasterlist',[
            'products' => $products,
        ]);
    }

    // GO TO ADD PRODUCT / ITEM
    public function addproduct(){
    $categories = Categorie::orderBy('name','asc')->get();
    $brands = Brand::orderBy('name','asc')->get();
    $products = Product::orderBy('name','asc')->get();
    return Inertia::render('admin/productcreatepage',
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
                 $incomingFields['logo'] = "fallback_image.png";
            }else{
                $file = $request->file('logo');
                $extension = $file->getClientOriginalExtension();
                $filename = Str::slug($incomingFields['name'])."logo".".".$extension;
               
                $file->move(public_path('files/brand_images'), $filename);
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

        if(!$request->hasFile('featured_image')){
                 $incomingFields['featured_image'] = "fallback_image.png";
            }else{
                $file = $request->file('logo');
                $extension = $file->getClientOriginalExtension();
                $filename = Str::slug($incomingFields['name'])."logo".".".$extension;
               
                $file->move(public_path('files/brand_images'), $filename);
                $incomingFields['logo'] = $filename;
            }


        $newProduct = Product::create($incomingFields);
        return redirect("/admin/products/{$newProduct->slug}/variants");

    }

    // GO TO VARIANT
        public function goToProductVariant($slug){
            $products = Product::where('slug','=',$slug)->firstOrFail();
            $categories = Categorie::where('id',$products->category_id)->firstOrFail();
            $variants = DB::table('product_variants as variants')
                        ->leftJoin('variant_inventories as inventory','inventory.product_variant_id','=','variants.id')
                        ->select(
                            'variants.id as id',
                            'variants.sku as sku',
                            'variants.selling_price as selling_price',
                            'variants.variant_name as variant_name',
                            'variants.is_active as is_active',
                            'inventory.quantity_on_hand as quantity_on_hand',
                        )
                        ->where('variants.product_id','=',$products->id)
                        ->groupBy(
                            'variants.id',
                            'variants.sku',
                            'variants.selling_price',
                            'variants.variant_name',
                            'variants.is_active',
                            'inventory.quantity_on_hand',
                        )
                        ->get();
        
            return Inertia::render('admin/productvariantpage',[
                'products' => $products,
                'variants' => $variants,
                'categories' => $categories,
            ]);
        }

    // GO TO CREATE VARIANT
        public function goToCreateProductVariant($slug){
            $products = Product::where('slug','=',$slug)->firstOrFail();
            $categories = Categorie::where('id',$products->category_id)->firstOrFail();
            return Inertia::render('admin/productvariantcreate',[
                'products' => $products, 'categories' => $categories,
            ]);
        }
    // SAVE CREATEAD VARIANT
        public function saveVariant(Request $request,$slug){
            $incomingFields = $request->validate([
                'sku' => 'required|string|max:50|unique:product_variants,sku',
                'barcode' => 'nullable|string|max:100|unique:product_variants,barcode',
                'cost_price' => 'required|numeric|min:0',
                'selling_price' => 'required|numeric|min:0|gte:cost_price',
                'variant_name' => 'required|string|max:100|unique:product_variants,variant_name',
                'is_active' => 'required|boolean',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
                'quantity_on_hand' => 'required|numeric|min:0',
                'reorder_level' => 'required|numeric|min:0',
            ]);
                $product = Product::where('slug','=',$slug)->firstOrFail();
                $incomingFields['product_id'] = $product->id;

            DB::transaction(function () use ($request, $incomingFields, $product) {
            
            $variant = ProductVariant::create([
                'product_id' => $incomingFields['product_id'],
                'sku' => $incomingFields['sku'],
                'barcode' => $incomingFields['barcode'],
                'cost_price' => $incomingFields['cost_price'],
                'selling_price' => $incomingFields['selling_price'],
                'variant_name' => $incomingFields['variant_name'],
                'is_active' => $incomingFields['is_active'],
            ]);

            VariantInventorie::create([
                'product_variant_id' => $variant->id,
                'quantity_on_hand' => $incomingFields['quantity_on_hand'],
                'reorder_level' => $incomingFields['reorder_level'],
            ]);


            if($request->hasFile('image')){
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = Str::slug($incomingFields['variant_name']).uniqid().".".$extension;
                
                $file->move(public_path('files/variant_images'), $filename);
                $incomingFields['image'] = $filename;

                $imageCheck = ProductImage::where('product_variant_id',$variant->id)->latest()->first();
                if(!$imageCheck){
                    ProductImage::create([
                        'product_variant_id' =>  $variant->id,
                        'image' =>$incomingFields['image'],
                        'sort_order' => 1,
                        ]);
                }else{
                    $incomingFields['sort_order'] = $imageCheck->sort_order + 1;
                    ProductImage::create([
                        'product_variant_id' =>  $variant->id,
                        'image' => $incomingFields['image'],
                        'sort_order' =>$incomingFields['sort_order'],
                        ]);
                }
            }

           });
           return redirect("/admin/products/{$slug}/variants");     

        }
}
