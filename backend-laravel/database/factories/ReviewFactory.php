<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
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
            'book_id'=> Book::factory(),
            'user_id'=> fake()->randomElement($userIds),
            'content'=> fake()->realTextBetween(3,500),
            'previous_book_status'=> fake()->randomElement($status),
        ];
    }
}
