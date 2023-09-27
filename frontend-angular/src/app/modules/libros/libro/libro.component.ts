import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/core/models';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent {

  @Input() libro!: Libro; // Declara una propiedad "libro" que recibirá el objeto libro del componente padre.

  queryparams="";

  listaLibros:Libro[] = [];

  

  constructor(private router: Router){

  }

  dameDetalle(){
    if (this.libro) {
      const libroId = this.libro.id; 
      this.router.navigate(['/libro-detalle', libroId]);
    }
  }
}
