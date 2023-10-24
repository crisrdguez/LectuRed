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

  //TODO MANDO TB LA OPCION SELECCIONAD
  /*
  @Input() opcionBusqueda:number=0;
  @Input() queryparams:string="";*/
  @Input() AuxText:string='';
  queryparams: string = '';
  opcionBusqueda: number = 0;

  libroSeleccionado:Libro | null = null;

  private queryServiceSubscription: Subscription | undefined;
  private opcionServiceSubscription: Subscription | undefined;

  constructor(private googleBooksService:GoogleBooksService, private buscadorService: BuscadorService, private route: ActivatedRoute){

  }

  ngOnInit(): void {
    console.log("IIIIIIIIIIIIIIIIIINIT    " + this.AuxText);
    this.queryServiceSubscription= this.buscadorService.getQueryParams().subscribe(queryParams => {
      
      console.log("---------------------------------NIT");
      this.queryparams = queryParams;
      // Realizar la búsqueda con los nuevos valores de queryParams
     
    });

    this.opcionServiceSubscription = this.buscadorService.getOpcionBusqueda().subscribe(opcionBusqueda => {
      this.opcionBusqueda = opcionBusqueda;
      // Realizar la búsqueda con el nuevo valor de opcionBusqueda
      console.log("+++++++++++++++++++++++++++++++NIT");
      this.busquedaLibros();
      
    });
    
    

    // Suscribirse a los cambios en los parámetros de consulta
    /*
    this.route.queryParams.subscribe((params) => {
      this.queryparams = params['q'] || ''; // 'q' es el nombre del parámetro de consulta
      this.buscadorService.setQueryParams(this.queryparams);
      this.buscadorService.setOpcionBusqueda(4); //cuatro es la opcion de categorias
      this.busquedaLibros();
    });*/
  }

  

  

  //Metodo que obtiene listado de libros
  busquedaLibros(){
    //console.log("<<<<<Entra en busqueda libros del libro-listas")
    //this.opcion=1;
    if(this.opcionBusqueda==1){
      console.log(">>>>>>Entra en opcion 1 en libros-listas")

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
      this.googleBooksService.getAuthor(this.queryparams, 5).subscribe({
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

      this.googleBooksService.getNews(this.queryparams, 10, "newest").subscribe({
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

  /*
  realizarBusquedaDesdeBuscador(){
    console.log("la opcion de busqueda en list-books es:" + this.opcionBusqueda);
    console.log("la opcion de queryparams en list-books es:" + this.queryparams);
    this.busquedaLibros();
  }*/

}
