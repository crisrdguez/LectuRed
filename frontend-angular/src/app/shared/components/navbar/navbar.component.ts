import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {categorias} from '../../../core/models/categorias';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  estaLog: boolean = false;

  categorias: any[] = categorias.categorias;

  

  queryparams:string="";
  showCategoriesDropdown: boolean = false;
  
  constructor(private router: Router, private authService: AuthService) {}


  buscarLibros() {
    // Navegar a la ruta de resultados de búsqueda con los parámetros de consulta
    this.router.navigate(['/libros/resultado-busqueda'], { queryParams: { q2: this.queryparams } });
  }

  estaLogueado(){ 

    this.estaLog = this.authService.estaAutenticado();
    return this.estaLog;
    
  }

  login(){
    //guardo el token en localstorage
    this.authService.guardarToken();

    
  }

  logout(){
    this.estaLog = false;
    this.authService.cerrarSesion();
  }

  

}
