import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/core/models';
import { ActividadService } from 'src/app/services/actividad.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';

@Component({
  selector: 'app-mi-actividad',
  templateUrl: './mi-actividad.component.html',
  styleUrls: ['./mi-actividad.component.css']
})
export class MiActividadComponent implements OnInit{

  
  idPersona: string = ''; //Lo cojo de mis datos al logarme
  listaActividad: any[] = []; // Definir una variable para almacenar los datos
  librosActividad : Libro[] = [];

  constructor(private actividadService: ActividadService, private googleBooksService:GoogleBooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Si no se recibe el id del libro, obtengo toda la informacion
    /*if(!this.idLibroEnvio){
      this.actividadService.getMiActividad().subscribe(data => {
        this.listaActividad = data.items;
        data.items.forEach((item:any) => this.getLibroId(item.idLibro));
      });
    }else{
      //Si se proporciona id de libro
      this.actividadService.getCriticasPorLibro(this.idLibroEnvio).subscribe((data) => {
        this.listaActividad = data.items;
        data.items.forEach((item: any) => this.getLibroId(item.idLibro));
      });
    }*/
    //Si se proporciona id de libro

    //idPersona lo cojo del localStorage
    this.idPersona = localStorage.getItem('idPersona') || '';

    this.actividadService.getMiActividad(this.idPersona).subscribe(data => {
      console.log(data.items);
      this.listaActividad = data.items; // Accede a la propiedad "items" del JSON
      //Por cada item que me llega del json, cojo el idLibro y llamo a la funcion getLibroId
      data.items.forEach((item:any) => this.getLibroId(item.idLibro));
    });
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
