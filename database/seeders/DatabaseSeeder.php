<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
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
            'name' => 'super_user',
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
            'role_id' => '1',
        ]);
    }
}
