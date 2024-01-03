import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadService } from './actividad.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  listaMisLibros: any[] = [];
  idPersona:string = '';

  constructor(private router: Router, private actividadService: ActividadService) { }

  // Método para guardar el token en el localStorage
  guardarToken(): void {
    localStorage.setItem('token', '123456789');
    if(this.estaAutenticado()){
      //TODO Accedo a los libros que vienen de la bbdd y los guardo en localstorage
    this.actividadService.getMisLibros().subscribe(data => {
      console.log(data.idUser)
      console.log(data.misLibros);
      this.listaMisLibros = data.misLibros; // Accede a la propiedad "misLibros" del JSON
      this.idPersona = data.idUser;
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

      localStorage.setItem('idPersona', this.idPersona);
    });
    }
  }

  // Método para obtener el token almacenado en el localStorage
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para verificar si el usuario está autenticado
  estaAutenticado(): boolean {
    return this.obtenerToken() !== null;
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('misLibros');
    localStorage.removeItem('idPersona');
    this.router.navigate(['/home']);
    window.location.reload(); //actualiza la pagina
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
