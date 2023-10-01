import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {categorias} from '../../../core/models/categorias';

@Component({
  selector: 'app-libro-categorias',
  templateUrl: './libro-categorias.component.html',
  styleUrls: ['./libro-categorias.component.css']
})
export class LibroCategoriasComponent implements OnInit{

  categorias: any[] = categorias.categorias;

  constructor(private router: Router){

  }

  ngOnInit() {

  }

  verLibrosPorCategoria(categoria:string){
    // Navegar a la ruta de listado de libros con la palabra clave de búsqueda con los parámetros de consulta
    this.router.navigate(['/libros/libro-listas'], { queryParams: { q: categoria } });
  }

  

}
