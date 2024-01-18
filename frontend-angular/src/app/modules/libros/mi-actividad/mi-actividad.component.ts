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

  
  idPersona: string = ''; 
  listaActividad: any[] = []; 
  librosActividad : Libro[] = [];

  constructor(private actividadService: ActividadService, private googleBooksService:GoogleBooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.idPersona = localStorage.getItem('idPersona') || '';

    this.actividadService.getMiActividad(this.idPersona).subscribe(data => {
      console.log(data.items);
      this.listaActividad = data.items; 
      this.listaActividad = this.listaActividad.reverse();
      data.items.forEach((item:any) => this.getLibroId(item.idLibro));
    });
  }

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

  buscaLibro(idLibro:string): Libro | undefined{

    const libroEncontrado = this.librosActividad.find(libro => libro.id === idLibro);

    return libroEncontrado;

  }

}
