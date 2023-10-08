import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {categorias} from '../../../core/models/categorias';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  categorias: any[] = categorias.categorias;

  queryparams:string="";
  showCategoriesDropdown: boolean = false;
  
  constructor(private router: Router) {}

  toggleCategoriesDropdown() {
    this.showCategoriesDropdown = !this.showCategoriesDropdown;
  }

  buscarLibros() {
    // Navegar a la ruta de resultados de búsqueda con los parámetros de consulta
    this.router.navigate(['/libros/resultado-busqueda'], { queryParams: { q: this.queryparams } });
  }

}
