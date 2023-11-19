<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rating>
 */
class RatingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
            $status=['desired','reading','read'];
            $rating=['1','2','3','4','5'];
            $userIds = User::pluck('id')->toArray();
            return [
                'book_id'=> Book::factory(),
                'user_id'=> fake()->randomElement($userIds),
                'rating'=> fake()->randomElement($rating),
                'previous_book_status'=> fake()->randomElement($status),
            ];

    }
}
