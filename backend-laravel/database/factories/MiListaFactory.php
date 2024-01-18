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
                "El mejor libro del mundo. Cada página es una sinfonía de imaginación con un sistema de magia ingeniosamente concebido y giros argumentales que desafían las expectativas. La narrativa envolvente y la habilidad de Sanderson para crear mundos vibrantes hacen de este libro una obra maestra, estableciendo un estándar excepcional en la literatura moderna.",
                
                "Una joya literaria que cautiva desde la primera página. La prosa delicada y evocadora transporta al lector a un mundo donde la realidad se entrelaza con la fantasía. Los personajes están tan bien desarrollados que es imposible no enamorarse de ellos. Una lectura que perdurará en la memoria.",
                
                "Este libro es una obra de arte literaria. La trama intrincada y los personajes complejos se combinan para crear una experiencia de lectura inolvidable. Cada capítulo revela capas más profundas de la historia, manteniendo al lector ansioso por descubrir qué sucederá a continuación. Una verdadera obra maestra.",
                
                "Una epopeya moderna que redefine el género. La escritura magistral del autor da vida a un mundo lleno de maravillas y peligros. La complejidad de los personajes y la trama absorbente hacen de este libro una lectura imprescindible para cualquier amante de la literatura.",
                
                "Un viaje emocional que deja una huella duradera. La profundidad psicológica de los personajes y la narrativa envolvente hacen que este libro sea una experiencia única. Cada palabra está impregnada de significado, y la conclusión es tan impactante como conmovedora.",
                
                "Una odisea literaria que desafía las convenciones. El autor ha creado un universo fascinante donde cada detalle contribuye a la riqueza de la historia. Las sorpresas constantes mantienen al lector en vilo, creando un vínculo emocional que perdura mucho después de cerrar el libro.",
                
                "Este libro es una joya escondida que merece ser descubierta. La prosa lírica y la trama bien construida se combinan para crear una experiencia de lectura cautivadora. Los personajes saltan de las páginas, y la resolución de la historia deja al lector reflexionando mucho después de terminar el libro.",
                
                "Una obra maestra de la narrativa contemporánea. La prosa elegante y la trama absorbente se entrelazan para formar un tapiz literario que captura la imaginación. Cada página revela nuevas capas de significado, manteniendo al lector comprometido de principio a fin.",
                
                "Este libro es un tesoro literario. La mezcla perfecta de suspense, romance y misterio lo convierte en una lectura adictiva. Los personajes son tan auténticos que es fácil perderse en sus mundos. Una experiencia de lectura que deja una impresión duradera.",
                
                "Un tour de force literario que desafía las convenciones del género. La narrativa magistral y los personajes complejos elevan este libro a nuevas alturas. Cada página es una revelación, y la conclusión es tan impactante como satisfactoria.",
                
                "Una joya literaria que merece un lugar destacado en cualquier estante. La maestría del autor para tejer una historia cautivadora es evidente en cada línea. Los giros argumentales mantienen al lector en vilo, y la resolución es tan sorprendente como satisfactoria.",
                
                "Este libro es una obra maestra de la creatividad. La originalidad de la trama y la profundidad de los personajes lo convierten en un viaje literario inolvidable. Cada página revela nuevos matices, manteniendo al lector intrigado de principio a fin.",
                
                "Una experiencia de lectura transformadora. La prosa poética y la profundidad emocional hacen que este libro sea más que una simple historia. Los temas universales explorados en la trama resuenan en el corazón del lector, creando una conexión duradera.",
                
                "Un triunfo literario que deja una impresión imborrable. La escritura envolvente y la trama magistralmente construida se combinan para crear un libro que no se puede dejar de leer. Cada página es un placer, y la conclusión es tan impactante como conmovedora.",
                
                "Este libro es un deleite para los amantes de la literatura. La maestría del autor para crear mundos vívidos y personajes memorables lo coloca en la cima del arte literario. Una lectura que transporta y cautiva desde el principio hasta el final."
        ];

        $user = User::inRandomOrder()->first();
        $idlibro = $this->faker->randomElement($idlibros);

        // Generar una nueva combinación hasta que sea única
        do {
            $user = User::inRandomOrder()->first();
            $idlibro = $this->faker->randomElement($idlibros);

            // Verificar si ya existe una entrada con el mismo user_id e idlibro
            $existingEntry = MiLista::where('user_id', $user->id)
                ->where('idlibro', $idlibro)
                ->first();
        } while ($existingEntry);

        $estado = $this->faker->randomElement(['leido', 'leyendo', 'deseado']);
        $puntuacion = ($estado === 'leido') ? $this->faker->numberBetween(1, 5) : null;
        $critica = ($estado === 'leido') ? $this->faker->randomElement($criticasDetalladas) : null;

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
        MiLista::where('id', $miLista->id)->update(['media_puntuacion' => $mediaPuntuacion]);

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
