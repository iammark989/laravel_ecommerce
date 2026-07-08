<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Categorie;
use App\Models\PriceList;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Uom;
use App\Models\VariantImage;
use App\Models\VariantInventorie;
use App\Models\VariantPrice;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProductController extends Controller
{
    //////////////      PRODUCT / ITEMS CONTROLLER //////////

    // GO TO PRODUCTS
    public function goToProductList(){
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
                'product.slug as slug',
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
                'product.slug',
                'user.username',
                'category.name',
                'brand.name'
            )
            ->get();

        
        return Inertia::render('admin/productlist',[
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

    // SAVE NEW PRODUCT 
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
                $file = $request->file('featured_image');
                $extension = $file->getClientOriginalExtension();
                $filename = Str::slug($incomingFields['name']).".".$extension;
               
                $file->move(public_path('files/product_images'), $filename);
                $incomingFields['featured_image'] = $filename;
            }


        $newProduct = Product::create($incomingFields);
        return redirect("/admin/product/{$newProduct->slug}/details");

    }


    // GO TO ADD VARIANT
        public function goToCreateProductVariant($slug){
            $products = Product::where('slug','=',$slug)->firstOrFail();
            $categories = Categorie::where('id',$products->category_id)->firstOrFail();
            $priceList = PriceList::orderBy('code','asc')->get();
            $uoms = Uom::orderBy('description')->get();
            $warehouses = Warehouse::orderBy('warehouse_code')->get();
            return Inertia::render('admin/productvariantadd',[
                'products' => $products,
                'categories' => $categories,
                'priceLists' => $priceList,
                'uoms' => $uoms,
                'warehouses' => $warehouses,
            ]);
        }

        // add price list
        public function addPriceList(Request $request){
        $incomingFields = $request->validate([
                'code' => [
                    'required',
                    'string',
                    'alpha_dash',
                    'max:25',
                    'unique:price_lists,code',
                ],

                'description' => [
                    'required',
                    'string',
                    'max:50',
                    'unique:price_lists,description',
                ],

                'is_active' => [
                    'required',
                    'boolean',
                ],
            ]); 
            }

    // ADD UOM / SAVE UOM

    public function saveUom(Request $request){
        $incomingFields = $request->validate([
                    'code' => ['required','string','alpha_dash','max:10',Rule::unique('uoms', 'code'),],
                    'description' => ['required','string','max:50',Rule::unique('uoms', 'description'),],
                    'is_active' => ['required','boolean',],
        ]);
        Uom::create($incomingFields);
    }

    // SAVE CREATED VARIANT / SAVE ADD VARIANT
        public function saveVariant(Request $request,$slug){
            $product = Product::whereSlug($slug)->firstOrFail(); 
            $incomingFields = $request->validate([
                'sku' => 'required|string|min:6|max:50|unique:product_variants,sku',
                'barcode' => 'nullable|string|max:100|unique:product_variants,barcode',
                'cost_price' => 'required|numeric|min:0',
                'warehouse_id' => 'required|exists:warehouses,id',
                'variant_name' => [
                    'required',
                    'string',
                    'max:100',
                    Rule::unique('product_variants')
                        ->where(function ($query) use ($product) {
                            return $query->where(
                                'product_id',
                                $product->id
                            );
                        }),
                ],
                'is_active' => 'required|boolean',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
                //'tax_type' => 'required|in:vatable,vat_exempt,zero_rated',
                'quantity_on_hand' => 'required|numeric|min:0',
                'reorder_level' => 'required|numeric|min:0',
                //'base_uom_id' => 'required|exists:uoms,id',
                'selling_uom_id' => 'required|exists:uoms,id',
                'purchasing_uom_id' => 'required|exists:uoms,id',
                'selling_qty' => 'required|numeric|gt:0',
                'purchasing_qty' => 'required|numeric|gt:0',
                
                'sellingPrices' => 'required|array|min:1',
                    'sellingPrices.*.price_list_id' => [
                        'required',
                        'integer',
                        'exists:price_lists,id',
                    ],
                    'sellingPrices.*.price' => [
                        'nullable',
                        'decimal:0,2',
                        'min:0',
                    ],
            ]);
                             

            DB::transaction(function () use ($request, $incomingFields, $product) {
            
            $variant = ProductVariant::create([
                'product_id' => $product->id,
                'sku' => $incomingFields['sku'],
                'barcode' => $incomingFields['barcode'],
                'cost_price' => $incomingFields['cost_price'],
                'warehouse_id' => $incomingFields['warehouse_id'],
                'variant_name' => $incomingFields['variant_name'],
                'is_active' => $incomingFields['is_active'],
                'selling_uom_id' => $incomingFields['selling_uom_id'],
                'purchasing_uom_id' => $incomingFields['purchasing_uom_id'],
                'selling_qty' => $incomingFields['selling_qty'],
                'purchasing_qty' => $incomingFields['purchasing_qty'],
                'base_uom_id' => $incomingFields['selling_uom_id'],
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
                    VariantImage::create([
                        'product_variant_id' =>  $variant->id,
                        'image' => $filename,
                        'sort_order' => 1,
                        ]);
            }else{
                $incomingFields['image'] = "fallback_image.png";
                VariantImage::create([
                        'product_variant_id' =>  $variant->id,
                        'image' =>$incomingFields['image'],
                        'sort_order' => 1,
                        ]);
            }

            foreach ($request->sellingPrices as $price) {

                if ($price['price'] === null || $price['price'] === '') {
                    continue;
                }
                VariantPrice::create([
                    'product_variant_id' => $variant->id,
                    'price_list_id'      => $price['price_list_id'],
                    'price'              => $price['price'],
                ]);

            }

           });
           return redirect("/admin/product/{$slug}/details");     

        }

        // GO TO PRODUCT VARIANT DETAILS PAGE
        public function goToProductVariantDetails($slug){
            $categories = Categorie::orderBy('name','asc')->get();
            $brands = Brand::orderBy('name','asc')->get();
            $products = DB::table('products as product')
                        ->leftJoin('categories as category','category.id','=','product.category_id')
                        ->leftJoin('brands as brand','brand.id','=','product.brand_id')
                        ->select(
                            'product.id as id',
                            'product.name as name',    
                            'product.slug as slug',
                            'product.short_description as short_description',
                            'product.description as description',
                            'product.featured_image as featured_image',
                            'product.is_active as is_active',
                            'brand.id as brand_id',
                            'category.id as category_id',
                        )
                        ->groupBy(
                            'product.id',
                            'product.name',    
                            'product.slug',
                            'product.short_description',
                            'product.description',
                            'product.featured_image',
                            'product.is_active',
                            'brand.id',
                            'category.id',
                        )
                        ->where('product.slug','=',$slug)
                        ->firstOrFail();
            $variants = DB::table('product_variants as variant')
                        ->leftJoin('variant_images as image','image.product_variant_id','=','variant.id')
                        ->leftJoin('variant_inventories as inventory','inventory.product_variant_id','=','variant.id')
                        ->leftJoin('variant_prices as price','price.product_variant_id','=','variant.id')
                        ->select(
                            'variant.id as id',
                            'variant.product_id as product_id',
                            'variant.sku as sku',
                            'variant.barcode as barcode',
                            'variant.warehouse_id as warehouse_id',
                            'variant.variant_name as variant_name',
                            'variant.is_active as is_active',
                            'image.image as image',
                            'inventory.quantity_on_hand as quantity_on_hand',
                            'inventory.reorder_level as reorder_level',
                            'price.price as price',
                        )
                        ->groupBy(
                            'variant.id',
                            'variant.product_id',
                            'variant.sku',
                            'variant.barcode',
                            'variant.warehouse_id',
                            'variant.variant_name',
                            'variant.is_active',
                            'image.image',
                            'inventory.quantity_on_hand',
                            'inventory.reorder_level',
                            'price.price',
                        )
                        ->where('variant.product_id','=',$products->id)
                        ->get();
            
            
            $allProducts = Product::get();
            return Inertia::render('admin/productvariantdetails',[
                'products' => $products,
                'brands' => $brands,
                'categories' => $categories,
                'allProducts' => $allProducts,
                'variants' => $variants,
            ]);
        }

        // SAVE EDIT / UPDATE ON PRODUCT DETAILS PAGE
    public function saveChanges(Request $request,$slug){
            $incomingFields = $request->validate([
            'category_id' => 'required',
            'brand_id' => 'required',
            'name' => 'required|string|max:50',
            'short_description' => 'required|max:255',
            'description' => 'required|max:1000',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_active' => 'required|boolean',
        ]);
        $currentDetails = Product::where('slug','=',$slug)->firstOrFail();
        $user = auth()->user()->id;
        $incomingFields['slug'] = Str::slug($incomingFields['name']);
        $incomingFields['created_by'] = $user;

        if(!$request->hasFile('featured_image')){
                 $incomingFields['featured_image'] = $currentDetails->featured_image;
            }else{
                if (
                        $currentDetails->featured_image &&
                        $currentDetails->featured_image !== 'fallback_image.png'
                    ) {
                        $path = public_path(
                            'files/variant_images/' .
                            $currentDetails->featured_image
                        );

                        if (file_exists($path)) {
                            unlink($path);
                        }
                    }
                    
                $file = $request->file('featured_image');
                $extension = $file->getClientOriginalExtension();
                $filename = $incomingFields['slug'] . uniqid() ."." . $extension;
                
                $file->move(public_path('files/product_images'), $filename);
                $incomingFields['featured_image'] = $filename;
                
                
            }

        $currentDetails->update($incomingFields);
    
       return redirect("/admin/product/{$currentDetails->slug}/details")->with('success','Product updated successfully.');
    }

        // GO TO VARIANT DETAILS PAGE WITH EDIT DETAILS  
    public function variantEditPage($slug,$variantid){
        $products = Product::where('slug','=',$slug)->firstOrFail();
        $categories = Categorie::where('id','=',$products->category_id)->firstOrfail();
        $variantPrices = VariantPrice::where('product_variant_id','=',$variantid)->get();
        $uoms = Uom::orderBy('description')->get();
        $priceList = PriceList::orderBy('code','asc')->get();
        $warehouses = Warehouse::orderBy('warehouse_code')->get();
        $variants = DB::table('product_variants as variant')
                        ->leftJoin('variant_images as image','image.product_variant_id','=','variant.id')
                        ->leftJoin('variant_inventories as inventory','inventory.product_variant_id','=','variant.id')
                        ->select(
                            'variant.id as id',
                            'variant.product_id as product_id',
                            'variant.sku as sku',
                            'variant.barcode as barcode',
                            'variant.cost_price as cost_price',
                            'variant.warehouse_id as warehouse_id',
                            'variant.variant_name as variant_name',
                            'variant.is_active as is_active',
                            'variant.selling_uom_id as selling_uom_id',
                            'variant.selling_qty as selling_qty',
                            'variant.purchasing_uom_id as purchasing_uom_id',
                            'variant.purchasing_qty as purchasing_qty',
                            'image.image as image',
                            'inventory.quantity_on_hand as quantity_on_hand',
                            'inventory.reorder_level as reorder_level',
                        )
                        ->groupBy(
                            'variant.id',
                            'variant.product_id',
                            'variant.sku',
                            'variant.barcode',
                            'variant.cost_price',
                            'variant.warehouse_id',
                            'variant.selling_uom_id',
                            'variant.selling_qty',
                            'variant.purchasing_uom_id',
                            'variant.purchasing_qty',
                            'variant.variant_name',
                            'variant.is_active',
                            'image.image',
                            'inventory.quantity_on_hand',
                            'inventory.reorder_level',
                        )
                        ->where('variant.id','=',$variantid)
                        ->firstOrFail();
        return Inertia::render('admin/productvariantedit',[
            'variants' => $variants,
            'categories' => $categories,
            'products' => $products,
            'variantPrices' => $variantPrices,
            'uoms' => $uoms,
            'warehouses' => $warehouses,
            'priceLists' => $priceList,
        ]);
    }

    // SAVE UPDATE ON VARIANT
    public function savechangesvariant(Request $request,$slug,$variantid){
            $products = Product::where('slug','=',$slug)->firstOrFail();
            $currentVariant = ProductVariant::where('id','=',$variantid)->firstOrfail();
            $currentVariantImage = VariantImage::where('product_variant_id','=',$variantid)->first();
            $currentInventory = VariantInventorie::where('product_variant_id','=',$variantid)->first();
            $currentPrice = VariantPrice::where('product_variant_id','=',$variantid)->firstOrfail();
        $incomingFields = $request->validate([
                    'sku' => [
                        'required',
                        'string',
                        'max:50',
                        Rule::unique('product_variants', 'sku')
                            ->ignore($variantid),
                    ],

                    'barcode' => [
                        'nullable',
                        'alpha_num',
                        'max:100',
                        Rule::unique('product_variants', 'barcode')
                            ->ignore($variantid),
                    ],

                    'variant_name' => [
                                        'required',
                                        'string',
                                        'max:100',
                                        Rule::unique('product_variants')
                                            ->where(function ($query) use ($currentVariant) {
                                                return $query->where(
                                                    'product_id',
                                                    $currentVariant->product_id
                                                );
                                            })
                                            ->ignore($variantid),
                                    ],

                    'cost_price' => 'required|numeric|min:0',
                    'warehouse_id' => 'required|exists:warehouses,id',
                    'is_active' => 'required|boolean',
                    'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
                    'quantity_on_hand' => 'required|numeric|min:0',
                    'reorder_level' => 'required|numeric|min:0',
                    'selling_uom_id' => 'required|exists:uoms,id',
                    'purchasing_uom_id' => 'required|exists:uoms,id',
                    'selling_qty' => 'required|numeric|gt:0',
                    'purchasing_qty' => 'required|numeric|gt:0',
                    //'tax_type' => 'required|in:vatable,vat_exempt,zero_rated',
                    //'base_uom_id' => 'required|exists:uoms,id',
                    
                    'sellingPrices' => 'required|array|min:1',
                    'sellingPrices.*.price_list_id' => [
                        'required',
                        'integer',
                        'exists:price_lists,id',
                    ],
                    'sellingPrices.*.price' => [
                        'nullable',
                        'decimal:0,2',
                        'min:0',
                    ],

                ]);

       
 DB::transaction(function () use ($request, $incomingFields, $products, $currentVariant, $currentVariantImage, $currentInventory,$currentPrice) {
        if(!$request->hasFile('image')){
                 $incomingFields['image'] = $currentVariantImage->image;
            }else{
                if (
                        $currentVariantImage->image &&
                        $currentVariantImage->image !== 'fallback_image.png'
                    ) {
                        $path = public_path(
                            'files/variant_images/' .
                            $currentVariantImage->image
                        );

                        if (file_exists($path)) {
                            unlink($path);
                        }
                    }
                    
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = Str::slug($incomingFields['variant_name']) . uniqid() ."." . $extension;
                
                $file->move(public_path('files/variant_images'), $filename);
                $incomingFields['image'] = $filename;
            }

            $currentVariant->update([
                'sku' => $incomingFields['sku'],
                'barcode' => $incomingFields['barcode'],
                'cost_price' => $incomingFields['cost_price'],
                'warehouse_id' => $incomingFields['warehouse_id'],
                'base_uom_id' => $incomingFields['selling_uom_id'],
                'selling_uom_id' => $incomingFields['selling_uom_id'],
                'selling_qty' => $incomingFields['selling_qty'],
                'purchasing_uom_id' => $incomingFields['purchasing_uom_id'],
                'purchasing_qty' => $incomingFields['purchasing_qty'],
                'variant_name' => $incomingFields['variant_name'],
                'is_active' => $incomingFields['is_active'],

            ]);
            $currentVariantImage->update([
                'image' => $incomingFields['image'],
            ]);
            $currentInventory->update([
                'quantity_on_hand' => $incomingFields['quantity_on_hand'],
                'reorder_level' => $incomingFields['reorder_level'],
            ]);
                
               foreach ($incomingFields['sellingPrices'] as $price) {

                if ($price['price'] === '' || $price['price'] === null) {
                    continue;
                }

                VariantPrice::updateOrCreate(

                    [
                        'product_variant_id' => $currentVariant->id,

                        'price_list_id' => $price['price_list_id'],
                    ],

                    [
                        'price' => $price['price'],
                    ]

                );
                }
        });
            
    }
    
}
