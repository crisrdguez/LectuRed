import { Injectable } from '@angular/core';
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

  constructor(private actividadService: ActividadService, private http: HttpClient) { }

  // Método para guardar el token en el localStorage
  guardarToken(token: string, idPersona: string, name: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('idPersona', idPersona);
    localStorage.setItem('name', name);
    localStorage.setItem('confeti','false');
    if(this.estaAutenticado()){
      //Accedo a los libros que vienen de la bbdd y los guardo en localstorage
      this.actividadService.getMisLibros().subscribe(data => {
        this.listaMisLibros = data.items; // Accede a la propiedad "misLibros" del JSON

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
    localStorage.removeItem('name');
    localStorage.removeItem('confeti');

    //this.router.navigate(['/home']);
    window.location.reload(); //actualiza la pagina
  }
  private logout() {
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
      },
      (error) => {
        console.error("Error en la solicitud:", error);
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

    localStorage.setItem('misLibros', JSON.stringify(librosLocalStorage));
  }
}
