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

  public surprise(): void {
    const canvas = this.renderer2.createElement('canvas');
    
    // Configura el estilo del canvas para que cubra toda la página
    this.renderer2.setStyle(canvas, 'position', 'fixed');
    this.renderer2.setStyle(canvas, 'top', '0');
    this.renderer2.setStyle(canvas, 'left', '0');
    this.renderer2.setStyle(canvas, 'width', '100%');
    this.renderer2.setStyle(canvas, 'height', '100%');
    this.renderer2.setStyle(canvas, 'z-index', '9999'); // Asegura que esté en la capa superior
  
    this.renderer2.appendChild(document.body, canvas);
  
    const myConfetti = confetti.create(canvas, {
      resize: true, // ajustará al tamaño de toda la pantalla
    });
  
    myConfetti ( { 
      particleCount : 200 , 
      spread : 160,
      shapes : [ 'square', 'circle', 'star' ],
      scalar:2,
      colors: ['#EFE8E8', '#E4C57F', '#00426C', '#122747', '#E47171', '#302B2D']
    } ) ;
  
    this.clicked = true;
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

}
