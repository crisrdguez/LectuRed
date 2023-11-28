import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  // Rutas a los archivos JSON que contienen datos de simulacion (actividad, recomendados, mis libros)
  jsonURL = 'assets/mock/actividad.json'; // Ruta al archivo JSON
  json_Recomendados_URL = 'assets/mock/recomendados.json'; // Ruta al archivo JSON
  json_misLibros = 'assets/mock/misLibros.json';
  json_misDatosLibros = 'assets/mock/misDatos.json';

  //url para listado de mis libros bbdd
  urlMisLibrosBBDD = 'http://localhost:3000/api/mybooks'; //Ruta a la api de Express


  constructor(private http: HttpClient) { }
  /**
   * Obtiene las críticas desde el archivo JSON.
   * @returns Observable con los datos de las críticas.
   */
  getCriticas(): Observable<any> {
    console.log(this.http.get(this.jsonURL));
    return this.http.get(this.jsonURL);
  }

  /**
   * Obtiene los libros recomendados desde el archivo JSON.
   * @returns Observable con los datos de los libros recomendados.
   */
  getRecomendados(): Observable<any> {
    console.log(this.http.get(this.json_Recomendados_URL));
    return this.http.get(this.json_Recomendados_URL);
  }

  /**
   * Obtiene la lista de los libros del usuario desde el archivo JSON.
   * @returns Observable con los datos de los libros del usuario.
   */
  getMisLibros(): Observable<any> {
    console.log(this.http.get(this.json_misDatosLibros));
    return this.http.get(this.json_misDatosLibros);
  }

  //Libros obtenidos de la bbdd - primera prueba
  getMisLibrosBBDD(): Observable<any> {
    console.log("entrando a getMisLibrosBBDD");
    console.log(this.urlMisLibrosBBDD);
    return this.http.get(this.urlMisLibrosBBDD);
  }

  
}
