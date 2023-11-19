<?php

namespace Database\Factories;

use DateTime;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=> fake()->firstName(),
            'last_name' => fake()->lastName(),
             'birth_date' => fake()->date($format = 'Y-m-d', $max = 'now'),
             'email' => fake()->unique()->freeEmail(),
             'email_verified_at' => fake()->dateTime(),
             'password' => fake()->password(),
             'city' =>fake()->city(),
             'profile_image'=>fake()->imageUrl(),
             'social_media'=>fake()->url(),
             'google_id'=>fake()->numberBetween(100000000000000000000 - 999999999999999999999),
             /*'google_acces_token'=> ,*/       
             'activity_visible'=> fake()->randomElement(['1','0']),
             'authentication_provider' => fake()->randomElement([null, 'google']),
             'remember_token' => fake()->randomAscii(60),


        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {

        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
