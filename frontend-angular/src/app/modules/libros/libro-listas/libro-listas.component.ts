import { Component, Input } from '@angular/core';
import { Libro } from 'src/app/core/models';
import { GoogleBooksService } from 'src/app/services/google-books.service';

@Component({
  selector: 'app-libro-listas',
  templateUrl: './libro-listas.component.html',
  styleUrls: ['./libro-listas.component.css']
})
export class LibroListasComponent {

  numeroLibros:number = 3;
  listaLibros:Libro[] = [];

  //TODO MANDO TB LA OPCION SELECCIONADA
  @Input() opcionBusqueda:number=0;
  @Input() queryparams:string="";


  libroSeleccionado:Libro | null = null;

  constructor(private googleBooksService:GoogleBooksService){

  }

  

  //Metodo que obtiene listado de libros
  busquedaLibros(){
    console.log("Entra en busqueda libros del libro-listas")
    //this.opcion=1;
    if(this.opcionBusqueda==1){
      console.log("Entra en opcion 1 en libros-listas")

      // Llama al método getAll del servicio para obtener la lista de libros
      this.googleBooksService.getAll(this.queryparams, 6).subscribe({
      next: (libros: Libro[]) => {
        this.listaLibros = libros;
        console.log(this.listaLibros);
      },
      error: (error) => {
        console.error('Error al obtener los libros', error);
      },
      complete: () => {
        console.info("Peticion completada");
      }
    });

    }

    if(this.opcionBusqueda==2){
      console.log("Entra en opcion 2 en libros-listas")

      // Llama al método getAll del servicio para obtener la lista de libros
      this.googleBooksService.getAuthor(this.queryparams).subscribe({
        next: (libros: Libro[]) => {
          this.listaLibros = libros;
          console.log(this.listaLibros);
        },
        error: (error) => {
          console.error('Error al obtener los libros', error);
        },
        complete: () => {
          console.info("Peticion completada");
        }
      });

    }

    if(this.opcionBusqueda==3){
      console.log("Entra en opcion 3 en libros-listas")

      this.googleBooksService.getTitle(this.queryparams).subscribe({
        next: (libros: Libro[]) => {
          this.listaLibros = libros;
          console.log(this.listaLibros);
        },
        error: (error) => {
          console.error('Error al obtener los libros', error);
        },
        complete: () => {
          console.info("Peticion completada");
        }
      });

    }

    console.log("Salgo del metodo busqueda libros");
  }

  realizarBusquedaDesdeBuscador(){
    console.log("la opcion de busqueda en list-books es:" + this.opcionBusqueda);
    console.log("la opcion de queryparams en list-books es:" + this.queryparams);
    this.busquedaLibros();
  }

}
