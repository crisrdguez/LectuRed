import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {categorias} from '../../../core/models/categorias';
import { AuthService } from 'src/app/services/auth.service';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  estaLog: boolean = false;

  categorias: any[] = categorias.categorias;

  listaMisLibros: any[] = [];

  queryparams:string="";
  showCategoriesDropdown: boolean = false;
  
  constructor(private router: Router, private authService: AuthService, private actividadService: ActividadService) {}


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

    //TODO Accedo a los libros que vienen de la bbdd y los guardo en localstorage
    this.actividadService.getMisLibros().subscribe(data => {
      console.log(data.misLibros);
      this.listaMisLibros = data.misLibros; // Accede a la propiedad "misLibros" del JSON
      console.log("Mi lista de libros que guardo en localstorage:");
      console.log(this.listaMisLibros);

      // Guardar en localStorage
      this.listaMisLibros.forEach(item => {
        const libroId = item.idLibro;
        const estado = item.estado;
        const puntuacion = item.puntuacion;
        const critica = item.critica;
        this.guardarLibroEnLocalStorage(libroId, estado, puntuacion, critica);
      });
    });
  }

  logout(){
    this.estaLog = false;
    this.authService.cerrarSesion();
  }

  private guardarLibroEnLocalStorage(libroId: string, estado: string, puntuacion: number, critica:string): void {
    const librosLocalStorage = JSON.parse(localStorage.getItem('misLibros') || '[]');

    // Verificar si el libro ya está en localStorage
    const libroExistente = librosLocalStorage.find((libro: any) => libro.idLibro === libroId);

    if (libroExistente) {
      // Actualizar el estado si ya existe en localStorage
      libroExistente.estado = estado;
      libroExistente.puntuacion = puntuacion;
      libroExistente.critica = critica;
    } else {
      // Agregar el libro si no existe en localStorage
      librosLocalStorage.push({ idLibro: libroId, estado, puntuacion, critica });
    }

    // Guardar en localStorage
    localStorage.setItem('misLibros', JSON.stringify(librosLocalStorage));
  }

}
