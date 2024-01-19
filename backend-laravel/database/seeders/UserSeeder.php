<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

public function run(): void
{
    User::create([
        'name' => 'Noa',
        'last_name' => 'Espinoza',
        'birth_date' => '1986-04-27',
        'email' => 'noa@gmail.com',
        'email_verified_at' => '2024-01-18 18:24:39',
        'password' => '$2y$10$l/YAuGGuCbilOiBK55C0f.EeowaP9IiMZBOUXqk2bE9U8ops/uU5S',
        'city' => 'Alcalá de Henarés',
        'created_at' => '2024-01-18 16:33:43',
        'updated_at' => '2024-01-18 21:49:45',
    ]);

    User::create([
        'name' => 'Daniel',
        'last_name' => 'del Valle',
        'birth_date' => '1971-09-08',
        'email' => 'daniel@gmail.com',
        'email_verified_at' => '2024-01-18 18:24:40',
        'password' => '$2y$10$l/YAuGGuCbilOiBK55C0f.EeowaP9IiMZBOUXqk2bE9U8ops/uU5S',
        'city' => 'Talavera de la Reina',
        'created_at' => '2024-01-18 16:48:54',
        'updated_at' => '2024-01-18 16:48:54',
    ]);

    User::create([
        'name' => 'Samuel',
        'last_name' => 'Velasco',
        'birth_date' => '2024-01-18',
        'email' => 'samuel@gmail.com',
        'email_verified_at' => '2024-01-18 18:24:41',
        'password' => '$2y$10$f/xwBM1MdiYfh3olWVfkpOamxVXwU4u.nBrDhEIQLrZpslcgAQ0PK',
        'city' => 'Granada',
        'created_at' => '2024-01-18 16:55:31',
        'updated_at' => '2024-01-18 21:58:27',
    ]);

    User::create([
        'name' => 'Eduardo',
        'last_name' => 'Andrade',
        'birth_date' => '1947-09-19',
        'email' => 'eduardo@gmail.com',
        'email_verified_at' => '2024-01-18 18:24:42',
        'password' => '$2y$10$hAjMAazdWrUEC0ODV5hjZ.FtnPeD.tMpzpV0zwkAbF.arT5zF4fMG',
        'city' => 'San Sebastian de los Reyes',
        'created_at' => '2024-01-18 16:59:32',
        'updated_at' => '2024-01-18 16:59:32',
    ]);

    User::create([
        'name' => 'Ivan',
        'last_name' => 'Rodriguez',
        'birth_date' => '2000-01-18',
        'email' => 'ivan@gmail.com',
        'email_verified_at' => '2024-01-18 18:24:44',
        'password' => '$2y$10$ghLgOXE1oFcpJ/siXH1ZkOeP8VsXEphPax8xjMRS9RW7TtXyzkKOu',
        'city' => 'Barcelona',
        'created_at' => '2024-01-18 17:01:40',
        'updated_at' => '2024-01-18 17:01:40',
    ]);
}
}
