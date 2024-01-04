import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/core/models';
import { ActividadService } from 'src/app/services/actividad.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';

@Component({
  selector: 'app-libro-actividad',
  templateUrl: './libro-actividad.component.html',
  styleUrls: ['./libro-actividad.component.css']
})
export class LibroActividadComponent implements OnInit{

  @Input() idLibroEnvio: string=""; //Recibo el id del libro

  listaActividad: any[] = []; // Definir una variable para almacenar los datos
  librosActividad : Libro[] = [];

  constructor(private actividadService: ActividadService, private googleBooksService:GoogleBooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Si no se recibe el id del libro, obtengo toda la informacion
    if(!this.idLibroEnvio){
      this.actividadService.getActividadGeneralBBDD().subscribe(data => {
        this.listaActividad = data.items;
        data.items.forEach((item:any) => this.getLibroId(item.idLibro));
      });
    }
    /*
    this.actividadService.getCriticas().subscribe(data => {
      console.log(data.items);
      this.listaActividad = data.items; // Accede a la propiedad "items" del JSON
      //Por cada item que me llega del json, cojo el idLibro y llamo a la funcion getLibroId
      data.items.forEach((item:any) => this.getLibroId(item.idLibro));
    });*/
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

  //Busco en mi array de libros el libro con el id que paso por parametro, este libro es el que se mandara al componente app-libro
  buscaLibro(idLibro:string): Libro | undefined{

    const libroEncontrado = this.librosActividad.find(libro => libro.id === idLibro);

    return libroEncontrado;

  }

  }
