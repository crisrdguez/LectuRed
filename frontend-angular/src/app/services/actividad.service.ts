import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  

  // Rutas a los archivos JSON que contienen datos de simulacion (actividad, recomendados, mis libros)
  jsonURL = 'assets/mock/actividad.json'; // Ruta al archivo JSON
  jsonURLMiActividad = 'assets/mock/miActividad.json';
  json_Recomendados_URL = 'assets/mock/recomendados.json'; // Ruta al archivo JSON
  json_misLibros = 'assets/mock/misLibros.json';
  json_misDatosLibros = 'assets/mock/misDatos.json';

  urlBase = 'http://localhost:3000';

  urlMisLibrosBBDD = `${this.urlBase}/api/mybooks`; //Ruta a la api de Express, Obtiene información de la lista de mis libros, necesito idPersona

  urlActividadGeneral = `${this.urlBase}/api/actividad`;

  urlMiActividad = `${this.urlBase}/api/miActividad`;

  urlActividadPorLibro = `${this.urlBase}/api/actividadLibro`;

  urlPuntuacionMedia = `${this.urlBase}/api/puntuacionmedia`;

  urlDatosLibros = `${this.urlBase}/api/misLibros`; //Ruta a la api de Express, //Permite hacer modificaciones en la BBDD -  añadir/eliminar libros a Mis Libros, cambiar estado, puntuacion y critica

  constructor(private http: HttpClient) { }
  

  getMisLibros(): Observable<any> {
    console.log("entrando a getMisLibrosBBDD");
    console.log(this.urlMisLibrosBBDD);
    let idPersona = localStorage.getItem('idPersona');

    const token = localStorage.getItem('token');
    const body = { };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.urlMisLibrosBBDD}?idPersona=${idPersona}`, { headers: headers });
  }

  getActividadGeneralBBDD(): Observable<any> {
    return this.http.get(this.urlActividadGeneral);
  }

  getMiActividad(idPersona: string): Observable<any> {
    console.log("entrando a getMiActividad, idPersona:" + idPersona);
    let url = `${this.urlMiActividad}?idPersona=${idPersona}`;
    return this.http.get(url);
  }

  getCriticasPorLibro(idLibro: string): Observable<any> {
    let url = `${this.urlActividadPorLibro}?idLibro=${idLibro}`;
    return this.http.get(url);
  }

  getPuntuacionMedia(idLibro: string | undefined): Observable<any> {
    let url = `${this.urlPuntuacionMedia}?idLibro=${idLibro}`;
    return this.http.get(url);
  }

  //BBDD:Metodos para modificar datos BBDD

  setMisLibros(idPersona: string, libroId: string, estado: string | undefined, 
    critica:string | undefined, puntuacion: number, metodo: string): void {
    const token = localStorage.getItem('token');

    var body = {
      idPersona: idPersona,
      idLibro: libroId,
      estado: estado,
      puntuacion: puntuacion,
      critica: critica, 
      metodo: metodo
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post(this.urlDatosLibros, body, { headers: headers }).subscribe();

  }

  /**
   * Obtiene los libros recomendados desde el archivo JSON.
   * @returns Observable con los datos de los libros recomendados.
   */
  getRecomendados(): Observable<any> {
    console.log(this.http.get(this.json_Recomendados_URL));
    return this.http.get(this.json_Recomendados_URL);
  }

  //NO LO USO YA
    /**
   * Obtiene la lista de los libros del usuario desde el archivo JSON.
   * @returns Observable con los datos de los libros del usuario.
   */
    getMisLibrosOLD(): Observable<any> {
      console.log(this.http.get(this.json_misDatosLibros));
      return this.http.get(this.json_misDatosLibros);
    }

  
}
