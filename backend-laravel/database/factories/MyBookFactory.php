<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MyBook>
 */
class MyBookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status=['desired','reading','read'];
        $userIds = User::pluck('id')->toArray();
        return [
            'user_id' => fake()->randomElement($userIds),
            'book_id'=> Book::factory(),
            'status' => fake()->randomElement($status),
        ];
    }
}
