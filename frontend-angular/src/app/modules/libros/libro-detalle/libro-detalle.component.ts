import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/core/models';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { LibroRatingComponent } from '../libro-rating/libro-rating.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css']
})
export class LibroDetalleComponent implements OnInit{
  libroId:string="";
  libroSeleccionado:Libro | null = null;
  estadoLibro: string = 'Añadir a Favoritos'; // Estado predeterminado
  puntuacion: number = 0;
  critica: string = '';
  estaAutenticado: boolean = false;

  constructor(private googleBooksService: GoogleBooksService, private route: ActivatedRoute, private authService: AuthService, public dialog: MatDialog) { }

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
            this.puntuacion = libroExistente.puntuacion;
            this.critica = libroExistente.critica;
            console.log(`${this.libroId} - ${this.estadoLibro} - ${this.puntuacion} - ${this.critica}`);
            this.rate(this.puntuacion);
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

    this.verificarAutenticacion();
      
  }

  verificarAutenticacion(): void {
    // Lógica para verificar si el usuario está autenticado usando tu servicio de autenticación y el token
    this.estaAutenticado = this.authService.estaAutenticado(); 
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    
    //El componente se va a inicializar cuando el dialogo lo abra
    this.dialog.open(LibroRatingComponent, {
      width: '900px',
      height: '500px',
      data:{
        enterAnimationDuration,
        exitAnimationDuration,
        libroSeleccionado: this.libroSeleccionado,  // Paso el libro seleccionado al diálogo
        estadoLibro: this.estadoLibro,  // Paso el estado del libro al diálogo
        puntuacion: this.puntuacion,  // Paso la puntuación al diálogo
        critica: this.critica  // Paso la crítica al diálogo
      }
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
