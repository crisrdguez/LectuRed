<?php

namespace Database\Seeders;

use App\Models\MyBook;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MyBookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MyBook::factory()->count(700)->create();
    }
}
