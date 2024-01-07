<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Review;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class); 
        /* $this->call(BookSeeder::class);
        $this->call(MyBookSeeder::class);
        $this->call(ReviewSeeder::class);
        $this->call(RatingSeeder::class); */
        $this->call(MiListaSeeder::class);
        $this->call(ActividadSeeder::class);
    }
}
