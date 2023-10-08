import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {categorias} from '../../../core/models/categorias';

@Component({
  selector: 'app-libro-categorias',
  templateUrl: './libro-categorias.component.html',
  styleUrls: ['./libro-categorias.component.css']
})
export class LibroCategoriasComponent implements OnInit{
  subject:string="";

  categorias: any[] = categorias.categorias;

  constructor(private router: Router, private route: ActivatedRoute){

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.subject = params['subject']; // Obtengo el ID del libro de los parámetros de la URL
      console.log(this.subject);
    });
  }

  verLibrosPorCategoria(categoria:string){
    // Navegar a la ruta de listado de libros con la palabra clave de búsqueda con los parámetros de consulta
    this.router.navigate(['/libros/libro-listas'], { queryParams: { q: categoria } });
  }

  

}
