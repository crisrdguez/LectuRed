<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $literary_genres = [
            'Terror',
            'Drama',
            'Fantasía',
            'Ciencia Ficción',
            'Misterio',
            'Romance',
            'Aventura',
            'Histórico',
            'Policíaco',
            'Thriller',
            'Comedia',
            'Suspense',
            'Distopía',
            'Biografía',
            'Autobiografía',
            'Ensayo',
            'Poesía',
            'Epistolar',
            'Realismo Mágico',
            'Novela Gráfica',
            'Infantil',
            'Juvenil',
            'Western',
            'Satírico',
            'Fábula',
            'Mitología',
            'Religioso',
            'Filosófico',
            'Humor Negro',
            'Crimen',
            'Noir',
            'Ficción Histórica',
            'Novela de Formación',
            'Político',
            'Comentario Social',
            'Humor',
            'Surrealismo',
            'Experimental',
            'Saga Familiar',
            'Cuento de Hadas',
            'Historia Alternativa',
            'Fantasía Urbana',
            'Ficción de Espionaje',
            'Ciencia Ficción Dura',
            'Ciencia Ficción Blanda',
            'Space Opera',
            'Ciencia Ficción Militar',
        ];
        $language = [
            'Español',
            'Inglés',
            'Chino',
            'Árabe',
            'Hindi',
            'Portugués',
            'Bengalí',
            'Ruso',
            'Japonés',
            'Panyabí',
            'Alemán',
            'Javanés',
            'Telugu',
            'Maratí',
            'Turco',
            'Tamil',
            'Urdu',
            'Italiano',
            'Vietnamita',
            'Coreano',
        ];
        
        // Puedes acceder a los lenguajes usando $lenguajes[0], $lenguajes[1], etc.
        
        
              
        return [
            'book_id'=>fake()->unique()->regexify('^[a-zA-Z0-9]{12}$'),
            'title'=>fake()->realTextBetween(10,50),     
            'author'=>fake()->name(),
            'thumbnail'=>fake()->imageUrl($dir = '/tmp', $width = 640, $height = 480),
            'textSnippet'=>fake()->realTextBetween(70,250,3),
            'isbn'=>fake()->isbn13(),
            'publisher'=>fake()->company(),
            'category'=>fake()->randomElement($literary_genres),
            'page_count'=>fake()->numberBetween( 1,3032),
            'language'=>fake()->randomElement($language),
            'publication_date'=>fake()->date($format = 'Y-m-d', $max = 'now'),
            
        ];
    }
}
