<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

     /**Best practice creating a admin seeder file */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@example.com'], // Avoid duplicate admin users
            [
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => bcrypt('Mole_0762055035'), 
                'role' => 'admin',
            ]
        );
    }
}
