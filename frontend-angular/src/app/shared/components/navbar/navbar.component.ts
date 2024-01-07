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
    return this.estaLog;
    
  }

  extraerId(){
    //Una vez extraido el id del usuario de la url, hacer peticion API al backend
    // POST http://127.0.0.1:8000/api/login

    this.idUsuario = this.route.snapshot.queryParamMap.get('id');
    console.log(this.idUsuario);

    /*Se debe indicar en el body de la peticion el id del usuario logado (ha llegao previamente por url al front http://localhost:4200/home?id=152)
  {
  "id":152
  }
    Devuelve:token, datos de usuario, Actividad del usuario*/
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
