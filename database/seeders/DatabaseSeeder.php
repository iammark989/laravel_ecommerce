<?php

namespace Database\Seeders;

use App\Models\PriceList;
use App\Models\Role;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
      
        Role::create([
            'name' => 'customer',
        ]);
        Role::create([
            'name' => 'super_user',
        ]);

        Warehouse::create([
            'warehouse_code' => 'WH-001',
            'name' => 'Main Warehouse',
            'contact_person' => 'admin',
            'contact_number' => '123456789',
            'email' => 'email@email.com',
            'address' => 'Philippines',
            'remarks' => '',
            'is_active' => true,
            'created_by' => '1',
            'updated_by' => '1',
        ]);
        
        PriceList::create([
               'code' => 'Retail',
                'description' => 'Retail Price',
                'is_active' => true,
        ]);
        

        // User::factory(10)->create();

        User::create([
            'first_name' => 'mark arvin',
            'middle_name' => 'd',
            'last_name' => 'valenzuela',
            'suffix' => '',
            'mobile' => '09123456789',
            'username' => 'developer',
            'email' => 'markarvinvalenzuela@gmail.com',
            'password' => Hash::make('P@ssword1!'),
            'role_id' => '2',
            'is_staff' => '1',
        ]);
    }
}
