import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

  //TODO BBDD: Ruta a la url para listado de mis libros bbdd
  urlBase = 'http://localhost:3000';

  urlMisLibrosBBDD = `${this.urlBase}/api/mybooks`; //Ruta a la api de Express

  urlActividadGeneral = `${this.urlBase}/api/actividad`;

  urlActividadPorLibro = `${this.urlBase}/api/actividadLibro`;

  urlMiActividad = `${this.urlBase}/api/miActividad`;


  constructor(private http: HttpClient) { }
  /**
   * Obtiene las críticas desde el archivo JSON.
   * @returns Observable con los datos de las críticas.
   */
  //todo borrar metodo getcriticas
  /*
  getCriticas(): Observable<any> {
    console.log(this.http.get(this.jsonURL));
    return this.http.get(this.jsonURL);
  }*/
//TODO BBDD
  getActividadGeneralBBDD(): Observable<any> {
    console.log("entrando a getActividadGeneralBBDD");
    console.log(this.urlActividadGeneral);
    return this.http.get(this.urlActividadGeneral);
  }

  //TODO BORRAR
  /*getCriticasPorLibro(idLibro: string): Observable<any> {
    return this.http.get(this.jsonURL).pipe(
      map((data: any) => {
        const criticasFiltradas = data.items.filter((item: any) => item.idLibro === idLibro);
        return { items: criticasFiltradas };
      })
    );
  }*/

  //todo BBDD
  getCriticasPorLibro(idLibro: string): Observable<any> {
    let url = `${this.urlActividadPorLibro}?idLibro=${idLibro}`;
    return this.http.get(url);
  }

  getMiActividad(): Observable<any> {
    console.log(this.http.get(this.jsonURLMiActividad));
    return this.http.get(this.jsonURLMiActividad);
  }

  /**para peticion BBDD 
  getCriticasPorLibro(idLibro: string): Observable<any> {
    const url = `${this.urlMisLibrosBBDD}?idLibro=${idLibro}`; // Asumiendo que tu servidor acepta un parámetro "idLibro"
    return this.http.get(url);
  }*/

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

  //TODO Libros obtenidos de la bbdd - primera prueba
  getMisLibrosBBDD(): Observable<any> {
    console.log("entrando a getMisLibrosBBDD");
    console.log(this.urlMisLibrosBBDD);
    return this.http.get(this.urlMisLibrosBBDD);
  }

  

  getMiActividadBBDD(): Observable<any> {
    console.log("entrando a getMiActividadBBDD");
    console.log(this.urlMisLibrosBBDD);
    return this.http.get(this.urlMisLibrosBBDD);
  }

  //TODO BBDD: Metodos para modificar datos BBDD

  

  
}
