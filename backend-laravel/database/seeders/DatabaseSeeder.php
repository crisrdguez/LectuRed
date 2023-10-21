<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UsersTableSeeder::class);
        $this->call(BooksTableSeeder::class);
        $this->call(MyBooksTableSeeder::class);
        $this->call(RatingsTableSeeder::class);
        $this->call(ReviewsTableSeeder::class);
    }
}
