import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // Método para guardar el token en el localStorage
  guardarToken(): void {
    localStorage.setItem('token', '123456789');
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
    this.router.navigate(['/home']);
    window.location.reload(); //actualiza la pagina
  }
}
