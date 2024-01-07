<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\MiLista;
use App\Models\Actividad;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MiLista>
 */
class MiListaFactory extends Factory
{
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // creamos un array con los siguientes datos que despues serán los idlibros.

        $idlibros = [
            "LsBkzwEACAAJ",
            "t1slEAAAQBAJ",
            "DDHFEAAAQBAJ",
            "YZseCgAAQBAJ",
            "hWSmEAAAQBAJ",
            "eyevEAAAQBAJ",
            "iFeDAgAAQBAJ",
            "uUDYEAAAQBAJ",
            "QXqyEAAAQBAJ",
            "6WssDwAAQBAJ",
            "qav9SQAACAAJ",
            "XuLvegf5SWIC",
            "xdWzcQAACAAJ",
            "6PjIEAAAQBAJ",
            "u1i8DwAAQBAJ",
            "103IAwAAQBAJ",
            "pLolEAAAQBAJ",
            "jmTDDwAAQBAJ",
            "Hp7QEAAAQBAJ",
        ];
        $criticasDetalladas = [
            'Me encantó la historia y los personajes. Altamente recomendado.',
            'Una lectura fascinante que te atrapa desde el principio.',
            'La narrativa es cautivadora. No pude dejar de leer.',
            'Personajes complejos y giros inesperados. ¡Impresionante!',
            'No esperaba el desenlace. ¡Sorprendentemente cautivador!',
            'La prosa es hermosa y la historia es emocionante. Lo disfruté mucho.',
            'Aunque la trama era predecible, los personajes la hicieron valer la pena.',
            'No pude conectar con los personajes. La historia fue decepcionante.',
            'Me decepcionó. La trama era predecible y los personajes eran planos.',
            'Una historia conmovedora que te deja reflexionando.',
            'La trama era intrigante, pero el final fue decepcionante.',
            'Los personajes eran interesantes, pero la trama carecía de profundidad.',
            'Me enganchó desde el principio. Muy recomendado.',
            'No pude dejar de leer. La historia es adictiva.',
            'Me gustó mucho la forma en que se desarrollaron los personajes.',
            'La trama era interesante, pero algunos personajes eran poco convincentes.',
            'La prosa era hermosa, pero la historia carecía de originalidad.',
            'Los giros inesperados mantuvieron mi interés. ¡Muy bien hecho!',
            'Una lectura ligera y entretenida. Perfecta para relajarse.',
            'La historia era predecible, pero los personajes la hicieron interesante.',
            'Me encantó el mundo que creó el autor. Una lectura envolvente.',
            'No me gustó el desarrollo de la trama. Fue un poco confuso.',
            'Los personajes eran entrañables, pero la trama carecía de emoción.',
            'Me encantó cada página. Una historia que te hace pensar.',
            'La trama era intrigante, pero el ritmo era un poco lento para mi gusto.',
            'La historia me dejó sin palabras. ¡Absolutamente impactante!',
            'Algunos personajes eran un poco cliché, pero la trama compensó.',
            'La trama era única y original. ¡Recomendaría este libro!',
            'Me hubiera gustado más desarrollo en algunos personajes.',
            'La trama me mantuvo en vilo. No podía esperar a ver qué sucedía.',
            'Los personajes eran complejos y bien escritos. Una joya literaria.',
            'La historia era cautivadora, pero el final fue un poco abrupto.',
            'Me encantó la diversidad de personajes. Una lectura enriquecedora.',
            'La trama era intrigante, pero algunos diálogos eran forzados.',
            'Una historia que te hace reflexionar sobre la vida. Muy conmovedora.',
            'La trama era predecible, pero la prosa era encantadora.',
            'No pude conectar con algunos personajes. La trama fue decepcionante.',
            'La historia tenía un buen ritmo. No podía dejar de leer.',
            'La trama era fascinante, pero el desarrollo de algunos personajes fue débil.',
            'Me gustó la originalidad de la historia. Muy recomendado.',
        ];

        $user = User::inRandomOrder()->first();
        $idlibro = $this->faker->randomElement($idlibros);
        $estado = $this->faker->randomElement(['leido', 'leyendo', 'deseado']);
        $puntuacion = ($estado === 'leido') ? $this->faker->numberBetween(1, 5) : null;
        $critica = ($estado === 'leido') ? $this->faker->text(200) : null;
       
            $miLista = MiLista::create([
                'user_id' => $user->id,
                'idlibro' => $idlibro,
                'estado' => $estado,
                'puntuacion' => ($estado === 'leido') ? $puntuacion : null,
                'critica' => ($estado === 'leido') ? $this->faker->randomElement($criticasDetalladas) : null,
            ]);

                // Calculamos la media de puntuación después de insertar el registro
    $mediaPuntuacion = MiLista::where('idlibro', $idlibro)
    ->whereNotNull('puntuacion')
    ->avg('puntuacion');

    // Actualizamos el campo 'media_puntuacion' en el registro insertado
     // Actualizamos el campo 'media_puntuacion' en todos los registros del libro
     MiLista::where('idlibro', $idlibro)->update(['media_puntuacion' => $mediaPuntuacion]);

    return [
        'user_id' => $user->id,
        'idlibro' => $idlibro,
        'estado' => $estado,
        'puntuacion' => ($estado === 'leido') ? $puntuacion : null,
        'critica' => ($estado === 'leido') ? $this->faker->randomElement($criticasDetalladas) : null,
        'media_puntuacion' => $mediaPuntuacion,
    ];
    }
}
