<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MasterDataSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | UOMs
        |--------------------------------------------------------------------------
        */

        $uoms = [
            [
                'code' => 'PC',
                'description' => 'Piece',
                'is_active' => true,
            ],
            [
                'code' => 'BOX',
                'description' => 'Box',
                'is_active' => true,
            ],
            [
                'code' => 'PACK',
                'description' => 'Pack',
                'is_active' => true,
            ],
            [
                'code' => 'KG',
                'description' => 'Kilogram',
                'is_active' => true,
            ],
            [
                'code' => 'L',
                'description' => 'Liter',
                'is_active' => true,
            ],
            [
                'code' => 'BOTTLE',
                'description' => 'Bottle',
                'is_active' => true,
            ],
        ];

        foreach ($uoms as $uom) {
            DB::table('uoms')->updateOrInsert(
                ['code' => $uom['code']],
                [
                    'description' => $uom['description'],
                    'is_active' => $uom['is_active'],
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Brands
        |--------------------------------------------------------------------------
        */

        $brands = [
            [
                'name' => 'Northstar Foods',
                'slug' => 'northstar-foods',
                'description' => 'Sample food and beverage brand.',
            ],
            [
                'name' => 'BluePeak',
                'slug' => 'bluepeak',
                'description' => 'Sample consumer goods brand.',
            ],
            [
                'name' => 'FreshVale',
                'slug' => 'freshvale',
                'description' => 'Sample beverage and grocery brand.',
            ],
            [
                'name' => 'DailyChoice',
                'slug' => 'dailychoice',
                'description' => 'Sample everyday products brand.',
            ],
            [
                'name' => 'PrimeHarvest',
                'slug' => 'primeharvest',
                'description' => 'Sample food products brand.',
            ],
        ];

        foreach ($brands as $brand) {
            DB::table('brands')->updateOrInsert(
                ['slug' => $brand['slug']],
                [
                    'name' => $brand['name'],
                    'description' => $brand['description'],
                    'is_active' => true,
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Categories
        |--------------------------------------------------------------------------
        */

        $categories = [
            [
                'name' => 'Coffee',
                'slug' => 'coffee',
                'description' => 'Coffee and coffee-based products.',
            ],
            [
                'name' => 'Juices',
                'slug' => 'juices',
                'description' => 'Fruit juices and related beverages.',
            ],
            [
                'name' => 'Bottled Water',
                'slug' => 'bottled-water',
                'description' => 'Bottled drinking water.',
            ],
            [
                'name' => 'Snacks',
                'slug' => 'snacks',
                'description' => 'Packaged snacks and light food products.',
            ],
            [
                'name' => 'Grocery',
                'slug' => 'grocery',
                'description' => 'General grocery products.',
            ],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->updateOrInsert(
                ['slug' => $category['slug']],
                [
                    'name' => $category['name'],
                    'description' => $category['description'],
                    'is_active' => true,
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Warehouses
        |--------------------------------------------------------------------------
        */

        $warehouses = [
            [
                'warehouse_code' => 'WH-001',
                'name' => 'Main Warehouse',
                'contact_person' => 'Warehouse Staff',
                'contact_number' => '09170000001',
                'email' => 'warehouse1@example.com',
                'address' => 'Main Warehouse',
                'remarks' => 'Primary inventory warehouse.',
            ],
            [
                'warehouse_code' => 'WH-002',
                'name' => 'Secondary Warehouse',
                'contact_person' => 'Warehouse Staff',
                'contact_number' => '09170000002',
                'email' => 'warehouse2@example.com',
                'address' => 'Secondary Warehouse',
                'remarks' => 'Secondary storage location.',
            ],
        ];

        foreach ($warehouses as $warehouse) {
            DB::table('warehouses')->updateOrInsert(
                ['warehouse_code' => $warehouse['warehouse_code']],
                [
                    'name' => $warehouse['name'],
                    'contact_person' => $warehouse['contact_person'],
                    'contact_number' => $warehouse['contact_number'],
                    'email' => $warehouse['email'],
                    'address' => $warehouse['address'],
                    'remarks' => $warehouse['remarks'],
                    'is_active' => true,
                    'created_by' => 'System Seeder',
                    'updated_by' => 'System Seeder',
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Suppliers
        |--------------------------------------------------------------------------
        */

        $suppliers = [
            [
                'supplier_code' => 'SUP-001',
                'name' => 'Alpha Trade Supply',
                'contact_person' => 'John Supplier',
                'address' => 'Sample Supplier Address 1',
                'contact_number' => '09180000001',
                'email' => 'alpha@example.com',
            ],
            [
                'supplier_code' => 'SUP-002',
                'name' => 'Bright Star Trading',
                'contact_person' => 'Maria Supplier',
                'address' => 'Sample Supplier Address 2',
                'contact_number' => '09180000002',
                'email' => 'brightstar@example.com',
            ],
            [
                'supplier_code' => 'SUP-003',
                'name' => 'Central Goods Distributor',
                'contact_person' => 'Peter Supplier',
                'address' => 'Sample Supplier Address 3',
                'contact_number' => '09180000003',
                'email' => 'centralgoods@example.com',
            ],
            [
                'supplier_code' => 'SUP-004',
                'name' => 'Evergreen Wholesale',
                'contact_person' => 'Anna Supplier',
                'address' => 'Sample Supplier Address 4',
                'contact_number' => '09180000004',
                'email' => 'evergreen@example.com',
            ],
            [
                'supplier_code' => 'SUP-005',
                'name' => 'Prime Source Trading',
                'contact_person' => 'Mark Supplier',
                'address' => 'Sample Supplier Address 5',
                'contact_number' => '09180000005',
                'email' => 'primesource@example.com',
            ],
        ];

        foreach ($suppliers as $supplier) {
            DB::table('suppliers')->updateOrInsert(
                ['supplier_code' => $supplier['supplier_code']],
                [
                    'name' => $supplier['name'],
                    'contact_person' => $supplier['contact_person'],
                    'address' => $supplier['address'],
                    'contact_number' => $supplier['contact_number'],
                    'email' => $supplier['email'],
                    'is_active' => true,
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Products
        |--------------------------------------------------------------------------
        */

        $productDefinitions = [
            [
                'category' => 'Coffee',
                'brand' => 'Northstar Foods',
                'name' => 'Classic Coffee',
                'short_description' => 'Classic roasted coffee.',
                'description' => 'Sample coffee product for testing purchasing and inventory.',
            ],
            [
                'category' => 'Juices',
                'brand' => 'FreshVale',
                'name' => 'Orange Juice',
                'short_description' => 'Refreshing orange juice.',
                'description' => 'Sample orange juice product for testing.',
            ],
            [
                'category' => 'Bottled Water',
                'brand' => 'BluePeak',
                'name' => 'Pure Drinking Water',
                'short_description' => 'Bottled drinking water.',
                'description' => 'Sample bottled water product.',
            ],
            [
                'category' => 'Snacks',
                'brand' => 'DailyChoice',
                'name' => 'Potato Chips',
                'short_description' => 'Crispy potato snack.',
                'description' => 'Sample potato chips product.',
            ],
            [
                'category' => 'Grocery',
                'brand' => 'PrimeHarvest',
                'name' => 'Premium Rice',
                'short_description' => 'Premium quality rice.',
                'description' => 'Sample rice product for purchasing and inventory testing.',
            ],
        ];

        foreach ($productDefinitions as $product) {

            $categoryId = DB::table('categories')
                ->where('slug', Str::slug($product['category']))
                ->value('id');

            $brandId = DB::table('brands')
                ->where('slug', Str::slug($product['brand']))
                ->value('id');

            DB::table('products')->updateOrInsert(
                ['slug' => Str::slug($product['name'])],
                [
                    'category_id' => $categoryId,
                    'brand_id' => $brandId,
                    'name' => $product['name'],
                    'short_description' => $product['short_description'],
                    'description' => $product['description'],
                    'featured_image' => 'fallback_image.png',
                    'is_active' => true,
                    'created_by' => 'System Seeder',
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Product Variants
        |--------------------------------------------------------------------------
        */

        $mainWarehouseId = DB::table('warehouses')
            ->where('warehouse_code', 'WH-001')
            ->value('id');

        $pcUomId = DB::table('uoms')
            ->where('code', 'PC')
            ->value('id');

        $boxUomId = DB::table('uoms')
            ->where('code', 'BOX')
            ->value('id');

        $packUomId = DB::table('uoms')
            ->where('code', 'PACK')
            ->value('id');

        $kgUomId = DB::table('uoms')
            ->where('code', 'KG')
            ->value('id');

        $literUomId = DB::table('uoms')
            ->where('code', 'L')
            ->value('id');

        $bottleUomId = DB::table('uoms')
            ->where('code', 'BOTTLE')
            ->value('id');


        $variants = [
            [
                'product' => 'Classic Coffee',
                'sku' => 'COF-55G',
                'barcode' => '100000000001',
                'variant_name' => '55g',
                'cost_price' => 85.00,
                'base_uom_id' => $pcUomId,
                'selling_uom_id' => $pcUomId,
                'purchasing_uom_id' => $boxUomId,
                'selling_qty' => 1,
                'purchasing_qty' => 12,
            ],
            [
                'product' => 'Classic Coffee',
                'sku' => 'COF-100G',
                'barcode' => '100000000002',
                'variant_name' => '100g',
                'cost_price' => 145.00,
                'base_uom_id' => $pcUomId,
                'selling_uom_id' => $pcUomId,
                'purchasing_uom_id' => $boxUomId,
                'selling_qty' => 1,
                'purchasing_qty' => 12,
            ],

            [
                'product' => 'Orange Juice',
                'sku' => 'OJ-250ML',
                'barcode' => '100000000003',
                'variant_name' => '250ml',
                'cost_price' => 25.00,
                'base_uom_id' => $bottleUomId,
                'selling_uom_id' => $bottleUomId,
                'purchasing_uom_id' => $boxUomId,
                'selling_qty' => 1,
                'purchasing_qty' => 24,
            ],
            [
                'product' => 'Orange Juice',
                'sku' => 'OJ-1L',
                'barcode' => '100000000004',
                'variant_name' => '1L',
                'cost_price' => 75.00,
                'base_uom_id' => $bottleUomId,
                'selling_uom_id' => $bottleUomId,
                'purchasing_uom_id' => $boxUomId,
                'selling_qty' => 1,
                'purchasing_qty' => 12,
            ],

            [
                'product' => 'Pure Drinking Water',
                'sku' => 'WTR-350ML',
                'barcode' => '100000000005',
                'variant_name' => '350ml',
                'cost_price' => 10.00,
                'base_uom_id' => $bottleUomId,
                'selling_uom_id' => $bottleUomId,
                'purchasing_uom_id' => $boxUomId,
                'selling_qty' => 1,
                'purchasing_qty' => 24,
            ],
            [
                'product' => 'Pure Drinking Water',
                'sku' => 'WTR-15L',
                'barcode' => '100000000006',
                'variant_name' => '1.5L',
                'cost_price' => 20.00,
                'base_uom_id' => $bottleUomId,
                'selling_uom_id' => $bottleUomId,
                'purchasing_uom_id' => $boxUomId,
                'selling_qty' => 1,
                'purchasing_qty' => 12,
            ],

            [
                'product' => 'Potato Chips',
                'sku' => 'CHP-50G',
                'barcode' => '100000000007',
                'variant_name' => '50g',
                'cost_price' => 30.00,
                'base_uom_id' => $packUomId,
                'selling_uom_id' => $packUomId,
                'purchasing_uom_id' => $boxUomId,
                'selling_qty' => 1,
                'purchasing_qty' => 24,
            ],
            [
                'product' => 'Potato Chips',
                'sku' => 'CHP-100G',
                'barcode' => '100000000008',
                'variant_name' => '100g',
                'cost_price' => 55.00,
                'base_uom_id' => $packUomId,
                'selling_uom_id' => $packUomId,
                'purchasing_uom_id' => $boxUomId,
                'selling_qty' => 1,
                'purchasing_qty' => 12,
            ],

            [
                'product' => 'Premium Rice',
                'sku' => 'RICE-5KG',
                'barcode' => '100000000009',
                'variant_name' => '5kg',
                'cost_price' => 320.00,
                'base_uom_id' => $kgUomId,
                'selling_uom_id' => $kgUomId,
                'purchasing_uom_id' => $kgUomId,
                'selling_qty' => 1,
                'purchasing_qty' => 5,
            ],
            [
                'product' => 'Premium Rice',
                'sku' => 'RICE-25KG',
                'barcode' => '100000000010',
                'variant_name' => '25kg',
                'cost_price' => 1500.00,
                'base_uom_id' => $kgUomId,
                'selling_uom_id' => $kgUomId,
                'purchasing_uom_id' => $kgUomId,
                'selling_qty' => 1,
                'purchasing_qty' => 25,
            ],
        ];


        foreach ($variants as $variant) {

            $productId = DB::table('products')
                ->where('slug', Str::slug($variant['product']))
                ->value('id');

            DB::table('product_variants')->updateOrInsert(
                ['sku' => $variant['sku']],
                [
                    'product_id' => $productId,
                    'barcode' => $variant['barcode'],
                    'cost_price' => $variant['cost_price'],
                    'warehouse_id' => $mainWarehouseId,
                    'tax_type' => 'vatable',
                    'base_uom_id' => $variant['base_uom_id'],
                    'selling_uom_id' => $variant['selling_uom_id'],
                    'selling_qty' => $variant['selling_qty'],
                    'purchasing_uom_id' => $variant['purchasing_uom_id'],
                    'purchasing_qty' => $variant['purchasing_qty'],
                    'variant_name' => $variant['variant_name'],
                    'remarks' => null,
                    'created_by' => null,
                    'updated_by' => null,
                    'is_active' => true,
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Variant Inventory
        |--------------------------------------------------------------------------
        */

        $variantIds = DB::table('product_variants')
            ->pluck('id');

        foreach ($variantIds as $variantId) {

            DB::table('variant_inventories')->updateOrInsert(
                ['product_variant_id' => $variantId],
                [
                    'quantity_on_hand' => 0,
                    'reorder_level' => 10,
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }
    }
}