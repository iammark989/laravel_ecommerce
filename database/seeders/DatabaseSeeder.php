<?php

namespace Database\Seeders;

use App\Models\PriceList;
use App\Models\Role;
use App\Models\User;

use Database\Seeders\MasterDataSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
        MasterDataSeeder::class,
        ]);
    }
}
