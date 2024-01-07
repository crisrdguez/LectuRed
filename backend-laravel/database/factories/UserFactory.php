<?php

namespace Database\Factories;

use DateTime;
use Illuminate\Database\Eloquent\Factories\Factory;

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

        $names = [
            'Lucía', 'Hugo', 'Martina', 'Mateo', 'Sofía', 'Daniel', 'Valentina', 'Pablo', 'Sara', 'Alejandro',
            'Elena', 'Álvaro', 'Aitana', 'Manuel', 'Julia', 'Leo', 'Emma', 'Mario', 'Alba', 'Adrián',
            'Laura', 'Enzo', 'Carmen', 'Diego', 'Paula', 'Javier', 'Clara', 'Marcos', 'Olivia', 'Iván',
            'Isabella', 'Miguel', 'Luna', 'Fernando', 'Amanda', 'Carlos', 'Victoria', 'David', 'Camila',
            'Jorge', 'Ana', 'Raúl', 'Natalia', 'Rubén', 'Juana', 'Jesús', 'Eva', 'Óscar', 'Marta',
            'Francisco', 'Valeria', 'Jaime', 'Isabel', 'Antonio', 'Juliana', 'Emilio', 'Gabriela', 'Ignacio',
            'Jimena', 'Alberto', 'Beatriz', 'Samuel', 'Carla', 'Tomás', 'Rocío', 'Juan', 'Marina',
            'Gonzalo', 'Ainhoa', 'Rafael', 'Daniela', 'Víctor', 'Isidora', 'Andrés', 'Alma', 'José',
            'Sophie', 'Mariano', 'Luciana'
        ];

        $cities = [
            'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma de Mallorca',
            'Las Palmas de Gran Canaria', 'Bilbao', 'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón',
            'Hospitalet de Llobregat', 'Vitoria-Gasteiz', 'A Coruña', 'Granada', 'Elche', 'Oviedo', 'Badalona',
            'Terrassa', 'Cartagena', 'Jerez de la Frontera', 'Sabadell', 'Móstoles', 'Santa Cruz de Tenerife',
            'Pamplona', 'Alcalá de Henares', 'Fuenlabrada', 'Almería', 'Leganés', 'San Sebastián', 'Getafe',
            'Burgos', 'Albacete', 'Santander', 'Castellón de la Plana', 'Badajoz', 'Salamanca', 'Huelva',
            'Logroño', 'Marbella', 'Lleida', 'Tarragona', 'Dos Hermanas', 'León', 'Algeciras', 'Ourense',
            'Alcobendas', 'Girona', 'Cádiz', 'Torrejón de Ardoz', 'Badalona', 'Parla', 'Alcorcón', 'Telde',
            'San Cristóbal de la Laguna', 'Santa Coloma de Gramenet', 'Jaén', 'Nou Barris', 'Mataró', 'Leganes',
            'Ferrol', 'Ciutat Vella', 'Lugo', 'Sant Martí', 'Alcalá de Guadaira', 'Cornellà de Llobregat',
            'Avilés', 'El Puerto de Santa María', 'Roquetas de Mar', 'Coslada', 'Talavera de la Reina', 'Torrevieja',
            'Torrent', 'Chiclana de la Frontera', 'Pozuelo de Alarcón', 'Rivas-Vaciamadrid', 'Mijas', 'Fuengirola',
            'Pontevedra', 'Vilanova i la Geltrú', 'Siero', 'Manresa', 'La Orotava', 'Toledo'
        ];

        $authenticationProvider = $this->faker->randomElement([null, 'google']);

        
        return [
            'name' => $this->faker->randomElement($names),
            'last_name' => $this->faker->lastName(),
            'birth_date' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'email' => $this->faker->unique()->freeEmail(),
             'email_verified_at' => fake()->dateTime(),
             'password' => $authenticationProvider === 'google' ? null : fake()->password(),
             'city' =>$this->faker->randomElement($cities),
             'profile_image'=>fake()->imageUrl(),
             'social_media'=>fake()->url(),
             'google_id'=>fake()->numberBetween(100000000000000000000 - 999999999999999999999),
             /*'google_acces_token'=> ,*/       
             'activity_visible'=> fake()->randomElement(['1','0']),
             'authentication_provider' => $authenticationProvider,
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
