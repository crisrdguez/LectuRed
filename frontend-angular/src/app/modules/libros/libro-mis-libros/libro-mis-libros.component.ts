import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/core/models';
import { ActividadService } from 'src/app/services/actividad.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';

@Component({
  selector: 'app-libro-mis-libros',
  templateUrl: './libro-mis-libros.component.html',
  styleUrls: ['./libro-mis-libros.component.css']
})
export class LibroMisLibrosComponent implements OnInit{

  listaMisLibros: any[] = []; // Definir una variable para almacenar los datos
  misLibros : Libro[] = [];
  librosBBDD : any[] = [];

  constructor(private actividadService: ActividadService, private googleBooksService:GoogleBooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      //TODO aqui deberia recuperarlo del localstorage
      this.listaMisLibros = JSON.parse(localStorage.getItem('misLibros') || '[]');
      console.log(this.listaMisLibros);

      //Por cada item que me llega del json, cojo el idLibro y llamo a la funcion getLibroId
      this.listaMisLibros.forEach((item:any) => this.getLibroId(item.idLibro));
    }


    /* EJEMPLO PETICION A LA BBDD
    this.actividadService.getMisLibrosBBDD().subscribe(data => {
      console.log("dentro del componente ts")
      console.log(data.data);
      this.librosBBDD = data.data;
    })*/
  

  //Metodo que busca un libro por id y lo guarda en mi array de libros
  getLibroId(idLibro:string){

    this.route.params.subscribe(params => {
      console.log(idLibro + "getIdLibro en actividad");
      this.googleBooksService.getDetalleLibro(idLibro).subscribe({
        next: (libro: Libro) => {
          this.misLibros?.push(libro);
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

    const libroEncontrado = this.misLibros.find(libro => libro.id === idLibro);

    return libroEncontrado;

  }

}
