import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {categorias} from '../../../core/models/categorias';
import { AuthService } from 'src/app/services/auth.service';
import * as confetti from 'canvas-confetti';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public clicked = false;
  idUsuario: string | null = '';
  name: string | null = '';
  estaLog: boolean = false;
  categorias: any[] = categorias.categorias;

  queryparams:string="";
  showCategoriesDropdown: boolean = false;
  
  constructor(private renderer2: Renderer2,private router: Router, private authService: AuthService, private route: ActivatedRoute) {}


  buscarLibros() {
    // Navegar a la ruta de resultados de búsqueda con los parámetros de consulta
    this.router.navigate(['/libros/resultado-busqueda'], { queryParams: { q: this.queryparams } });
  }

  estaLogueado(){ 

    this.estaLog = this.authService.estaAutenticado();
    if(this.estaLog){
      this.name = localStorage.getItem('name');
    }
    return this.estaLog;
    
  }

  logout(){
    this.estaLog = false;
    this.authService.cerrarSesion();
  }

}
