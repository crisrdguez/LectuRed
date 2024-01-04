import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/core/models';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { LibroRatingComponent } from '../libro-rating/libro-rating.component';
import { AuthService } from 'src/app/services/auth.service';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css']
})
export class LibroDetalleComponent implements OnInit{
  
  idLibroEnvio:string | undefined;
  idLibro:string | undefined;
  
  listaActividad: any[] = []; // Definir una variable para almacenar los datos
  librosActividad : Libro[] = [];

  libroSeleccionado:Libro | null = null;
  estadoLibro: string = 'Añadir a Favoritos'; // Estado predeterminado
  puntuacion: number = 0;
  puntuacionMedia: number = 0; //TODO se pide la puntuacion media del libro a la bbdd, en el metodo de mas abajo obtenerPuntuacionMedia
  critica: string = '';
  estaAutenticado: boolean = false;

  constructor(private googleBooksService: GoogleBooksService, private route: ActivatedRoute, private authService: AuthService, private actividadService: ActividadService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idLibro = params['id']; // Obtengo el ID del libro de los parámetros de la URL
      console.log(this.idLibro);
      this.googleBooksService.getDetalleLibro(this.idLibro).subscribe({
        next: (libro: Libro) => {
          this.libroSeleccionado = libro;
          console.log(this.libroSeleccionado);
          // Verificar si el libro está en localStorage y actualizar el estado
          const librosLocalStorage = JSON.parse(localStorage.getItem('misLibros') || '[]');
          const libroExistente = librosLocalStorage.find((libro: any) => libro.idLibro === this.idLibro);

          if (libroExistente) {
            this.estadoLibro = libroExistente.estado;
            this.puntuacion = libroExistente.puntuacion;
            this.critica = libroExistente.critica;
            console.log(`${this.idLibro} - ${this.estadoLibro} - ${this.puntuacion} - ${this.critica}`);
            //this.rate(this.puntuacion);
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

    if (this.idLibro !== undefined) {
      this.actividadService.getCriticasPorLibro(this.idLibro).subscribe((data) => {
        this.listaActividad = data.items;
        data.items.forEach((item: any) => this.getLibroId(item.idLibro));
      });
    }
      
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
        puntuacion: this.puntuacion,  // Paso mi puntuación al diálogo
        critica: this.critica  // Paso la crítica al diálogo
      }
    });
    // Recargar la página
  
  }

  //Metodo que busca un libro por id y lo guarda en mi array de libros
  getLibroId(idLibro:string){

    this.route.params.subscribe(params => {
      console.log(idLibro + "getIdLibro en actividad");
      this.googleBooksService.getDetalleLibro(idLibro).subscribe({
        next: (libro: Libro) => {
          this.librosActividad?.push(libro);
          console.log(this.librosActividad);
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
  //TODO puntuacion media que me llega de la bbdd
  obtenerPuntuacionMedia(libro: any):number{
    this.puntuacionMedia = libro.averageRating;
    return 4.2;
  }
//TODO eliminar este metodo
  rate(stars:any) {
    const resultElement = document.getElementById('result');
    if(!resultElement) {
        return;
    }
    resultElement.textContent = `Has puntuado con ${stars} estrellas`;
}

}
