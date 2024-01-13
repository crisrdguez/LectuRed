import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {categorias} from '../../../core/models/categorias';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  idUsuario: string | null = '';
  name: string | null = '';
  estaLog: boolean = false;
  categorias: any[] = categorias.categorias;

  queryparams:string="";
  showCategoriesDropdown: boolean = false;
  
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {}


  buscarLibros() {
    // Navegar a la ruta de resultados de búsqueda con los parámetros de consulta
    this.router.navigate(['/libros/resultado-busqueda'], { queryParams: { q2: this.queryparams } });
  }

  estaLogueado(){ 

    this.estaLog = this.authService.estaAutenticado();
    if(this.estaLog){
      this.name = localStorage.getItem('name');
    }
    return this.estaLog;
    
  }

  extraerId(){
    this.idUsuario = this.route.snapshot.queryParamMap.get('id');
    console.log(this.idUsuario);
  }

  logout(){
    this.estaLog = false;
    this.authService.cerrarSesion();
  }

}
