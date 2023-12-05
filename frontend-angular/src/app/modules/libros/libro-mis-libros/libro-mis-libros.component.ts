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
    this.actividadService.getMisLibros().subscribe(data => {
      console.log(data.misLibros);
      this.listaMisLibros = data.misLibros; // Accede a la propiedad "misLibros" del JSON
      console.log("Mi lista de libros que guardo en localstorage:");
      console.log(this.listaMisLibros);

      // Guardar en localStorage
      this.listaMisLibros.forEach(item => {
        const libroId = item.idLibro;
        const estado = item.estado;
        const puntuacion = item.puntuacion;
        const critica = item.critica;
        this.guardarLibroEnLocalStorage(libroId, estado, puntuacion, critica);
      });

      //Por cada item que me llega del json, cojo el idLibro y llamo a la funcion getLibroId
      data.misLibros.forEach((item:any) => this.getLibroId(item.idLibro));
    });

    

    /*
    this.actividadService.getMisLibrosBBDD().subscribe(data => {
      console.log("dentro del componente ts")
      console.log(data.data);
      this.librosBBDD = data.data;
    })*/
  }

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

  // Función para guardar el libro en localStorage
  private guardarLibroEnLocalStorage(libroId: string, estado: string, puntuacion: number, critica:string): void {
    const librosLocalStorage = JSON.parse(localStorage.getItem('misLibros') || '[]');

    // Verificar si el libro ya está en localStorage
    const libroExistente = librosLocalStorage.find((libro: any) => libro.idLibro === libroId);

    if (libroExistente) {
      // Actualizar el estado si ya existe en localStorage
      libroExistente.estado = estado;
      libroExistente.puntuacion = puntuacion;
      libroExistente.critica = critica;
    } else {
      // Agregar el libro si no existe en localStorage
      librosLocalStorage.push({ idLibro: libroId, estado, puntuacion, critica });
    }

    // Guardar en localStorage
    localStorage.setItem('misLibros', JSON.stringify(librosLocalStorage));
  }

}
