import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Libro } from 'src/app/core/models';
import { BuscadorService } from 'src/app/services/buscador.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';

@Component({
  selector: 'app-libro-listas',
  templateUrl: './libro-listas.component.html',
  styleUrls: ['./libro-listas.component.css']
})
export class LibroListasComponent implements OnInit, OnDestroy{

  listaLibros:Libro[] = [];

  queryparams: string = '';
  opcionBusqueda: number = 0;

  private queryServiceSubscription: Subscription | undefined;
  private opcionServiceSubscription: Subscription | undefined;

  constructor(private googleBooksService:GoogleBooksService, private buscadorService: BuscadorService){

  }

  ngOnInit(): void {
    this.queryServiceSubscription= this.buscadorService.getQueryParams().subscribe(queryParams => {
      this.queryparams = queryParams;   
    });

    this.opcionServiceSubscription = this.buscadorService.getOpcionBusqueda().subscribe(opcionBusqueda => {
      this.opcionBusqueda = opcionBusqueda;
      // Realizar la búsqueda con el nuevo valor de opcionBusqueda
      this.busquedaLibros();     
    });
  }

  //Metodo que obtiene listado de libros
  busquedaLibros(){
    //this.opcion=1;
    if(this.opcionBusqueda==1){
      console.log(">>>>>>Entra en opcion 1 en libros-listas")

      // Llama al método getAll del servicio para obtener la lista de libros
      this.googleBooksService.getAll(this.queryparams, 15).subscribe({
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
      this.googleBooksService.getAuthor(this.queryparams, 15).subscribe({
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
    //opcion categorias
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

    //opcion novedades
    if(this.opcionBusqueda==5){
      console.log("Entra en opcion 5 en libros-listas")

      this.googleBooksService.getNews(this.queryparams, 15, "newest").subscribe({
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

    console.log("****************Salgo del metodo busqueda libros");
  }

  ngOnDestroy(): void {
    
    this.queryServiceSubscription?.unsubscribe();
    this.opcionServiceSubscription?.unsubscribe();
   
  }

}
