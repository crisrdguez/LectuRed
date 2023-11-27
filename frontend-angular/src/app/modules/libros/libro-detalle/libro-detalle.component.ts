import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/core/models';
import { GoogleBooksService } from 'src/app/services/google-books.service';

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css']
})
export class LibroDetalleComponent implements OnInit{
  libroId:string="";
  libroSeleccionado:Libro | null = null;
  estadoLibro: string = 'Añadir a Favoritos'; // Estado predeterminado

  constructor(private googleBooksService: GoogleBooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.libroId = params['id']; // Obtengo el ID del libro de los parámetros de la URL
      console.log(this.libroId);
      this.googleBooksService.getDetalleLibro(this.libroId).subscribe({
        next: (libro: Libro) => {
          this.libroSeleccionado = libro;
          console.log(this.libroSeleccionado);
          // Verificar si el libro está en localStorage y actualizar el estado
          const librosLocalStorage = JSON.parse(localStorage.getItem('misLibros') || '[]');
          const libroExistente = librosLocalStorage.find((libro: any) => libro.idLibro === this.libroId);

          if (libroExistente) {
            this.estadoLibro = libroExistente.estado;
          }
        },
        error: (error) => {
          console.error('Error al obtener los libros', error);
        },
        complete: () => {
          console.info("Peticion completada");
        }
      });
    });
      
  }

  agregarAFavoritos(libro: any): void {
    console.log('Libro añadido a favoritos:', libro.title);
  }

  obtenerPuntuacionMedia(libro: any):string{
    return "";
  }

  rate(stars:any) {
    const resultElement = document.getElementById('result');
    if(!resultElement) {
        return;
    }
    resultElement.textContent = `Has puntuado con ${stars} estrellas`;
}

}
