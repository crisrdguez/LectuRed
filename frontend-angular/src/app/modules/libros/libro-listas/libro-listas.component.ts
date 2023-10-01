import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/core/models';
import { BuscadorService } from 'src/app/services/buscador.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';

@Component({
  selector: 'app-libro-listas',
  templateUrl: './libro-listas.component.html',
  styleUrls: ['./libro-listas.component.css']
})
export class LibroListasComponent implements OnInit{

  listaLibros:Libro[] = [];

  //TODO MANDO TB LA OPCION SELECCIONAD
  /*
  @Input() opcionBusqueda:number=0;
  @Input() queryparams:string="";*/
  queryparams: string = '';
  opcionBusqueda: number = 0;

  libroSeleccionado:Libro | null = null;

  constructor(private googleBooksService:GoogleBooksService, private buscadorService: BuscadorService, private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.buscadorService.getQueryParams().subscribe(queryParams => {
      this.queryparams = queryParams;
      // Realizar la búsqueda con los nuevos valores de queryParams
      this.busquedaLibros();
    });

    this.buscadorService.getOpcionBusqueda().subscribe(opcionBusqueda => {
      this.opcionBusqueda = opcionBusqueda;
      // Realizar la búsqueda con el nuevo valor de opcionBusqueda
      this.busquedaLibros();
    });

    // Suscribirse a los cambios en los parámetros de consulta
    this.route.queryParams.subscribe((params) => {
      this.queryparams = params['q'] || ''; // 'q' es el nombre del parámetro de consulta
      this.buscadorService.setQueryParams(this.queryparams);
      this.buscadorService.setOpcionBusqueda(4); //cuatro es la opcion de categorias
      this.busquedaLibros();
    });
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

    if(this.opcionBusqueda==4){
      console.log("Entra en opcion 4 en libros-listas")

      this.googleBooksService.getSubject(this.queryparams).subscribe({
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

  /*
  realizarBusquedaDesdeBuscador(){
    console.log("la opcion de busqueda en list-books es:" + this.opcionBusqueda);
    console.log("la opcion de queryparams en list-books es:" + this.queryparams);
    this.busquedaLibros();
  }*/

}
