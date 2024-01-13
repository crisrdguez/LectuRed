import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadService } from './actividad.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  listaMisLibros: any[] = [];
  idPersona:string = '';

  //rutas express
  urlBase = 'http://localhost:3000';
  urlLogout = `${this.urlBase}/api/logout`;

  constructor(private router: Router, private actividadService: ActividadService, private http: HttpClient) { }

  // Método para guardar el token en el localStorage
  guardarToken(token: string, idPersona: string, name: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('idPersona', idPersona);
    localStorage.setItem('name', name);
    if(this.estaAutenticado()){
      //TODO Accedo a los libros que vienen de la bbdd y los guardo en localstorage
      this.actividadService.getMisLibros().subscribe(data => {
        console.log("<<<<<<<<<<<<<<<<<<<");
        console.log(data.items);
        this.listaMisLibros = data.items; // Accede a la propiedad "misLibros" del JSON
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
      },
      error => {
        console.error("Error en el observable:", error);
      }
      );
    }
  }

  //Metodo para pedir el token haciendo peticion a la bbdd con el id del usuario
  peticionToken(){
    
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
    
    //logout en express
    this.logout();

    localStorage.removeItem('token');
    localStorage.removeItem('misLibros');
    localStorage.removeItem('idPersona');

    //this.router.navigate(['/home']);
    window.location.reload(); //actualiza la pagina
  }
  private logout() {

    console.log("llamamos al logout de express");
    console.log(this.urlLogout);
    // Define el cuerpo de la solicitud (body)
    
    const body = {};

    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realiza la petición POST
    console.log("urlLogout:"+this.urlLogout + "body:"+body);
    this.http.post(this.urlLogout, body, { headers: headers }).subscribe(
      (response) => {
        console.log("Respuesta exitosa:", response);
        // Puedes realizar acciones adicionales con la respuesta si es necesario
      },
      (error) => {
        console.error("Error en la solicitud:", error);
        // Puedes manejar el error de acuerdo a tus necesidades
      }
    );

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
