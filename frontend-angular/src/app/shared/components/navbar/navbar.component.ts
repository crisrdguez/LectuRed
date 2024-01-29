import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {categorias} from '../../../core/models/categorias';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isSmallScreen = false;
  navMenu: any;
  afterMenu: any;
  menuOptions:any;
  idUsuario: string | null = '';
  name: string | null = '';
  estaLog: boolean = false;
  categorias: any[] = categorias.categorias;

  queryparams:string="";
  showCategoriesDropdown: boolean = false;

  isMenuOpen = false;
  
  constructor(private router: Router, private authService: AuthService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    // Observa cambios en el tamaño de la pantalla
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        // Actualiza la variable isSmallScreen basada en el tamaño de la pantalla
        this.isSmallScreen = result.matches;
      });
  }

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

  toggleMenu():void {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
