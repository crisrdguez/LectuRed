import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/core/models';
import { ActividadService } from 'src/app/services/actividad.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  listaRecomendados: any[] = []; // Definir una variable para almacenar los datos
  librosRecomendados : Libro[] = [];

  //todo falta listado de novedades

  constructor(private actividadService: ActividadService, private googleBooksService:GoogleBooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.actividadService.getRecomendados().subscribe(data => {
      console.log(data.items);
      this.listaRecomendados = data.recomendados; // Accede a la propiedad "items" del JSON
      //Por cada item que me llega del json, cojo el idLibro y llamo a la funcion getLibroId
      data.recomendados.forEach((recomendados:any) => this.getLibroId(recomendados.idLibro));
    });
  }

  //Metodo que busca un libro por id y lo guarda en mi array de libros
  getLibroId(idLibro:string){

    this.route.params.subscribe(params => {
      console.log(idLibro + "getIdLibro en recomendados");
      this.googleBooksService.getDetalleLibro(idLibro).subscribe({
        next: (libro: Libro) => {
          this.librosRecomendados?.push(libro);
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

    const libroEncontrado = this.librosRecomendados.find(libro => libro.id === idLibro);

    return libroEncontrado;

  }

}
