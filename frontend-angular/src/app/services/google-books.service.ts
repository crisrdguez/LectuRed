//Servicio que se utiliza para hacer peticiones a la API de Google Books y transforma las respuestas en objetos Libro
/**
   * ACLARACION
   * las solicitudes HTTP son asincrónicas, 
   * por lo que debes manejar la respuesta de manera asincrónica y, 
   * en lugar de devolver directamente un Libro[] desde el método getAll, 
   * deberías usar un observable para que el cliente pueda suscribirse a los resultados una vez que estén disponibles
   */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { fromJsonToLibroArray, fromJsonToLibro } from '../shared/utils/app-utils';
import { Libro } from '../core/models/libro.model';
import {BookVolumes, VolumeItem}  from '../core/models/libro.interface';

@Injectable({
  providedIn: 'root' //especifica que el servicio debe proporcionarse en el inyector raíz (AppModule).
})
export class GoogleBooksService {

  //url para listado de libros
  private urlLista = 'http://localhost:3000/api/all'; //Ruta a la api de Express

  //url para detalle libro
  private urlDetalle = 'http://localhost:3000/detalle'; //Ruta a la api de Express



  //Inyectamos el modulo HttpClient que se utilizará para realizar solicitudes HTTP a la API de Googlebooks
  constructor(private http:HttpClient) {}

  /**
   *  Realiza una solicitud HTTP a la API de Google Books
   * @param queryParams Parámetros de consulta utilizados para buscar libros en la API.
   * @returns Un observable que emite un arreglo de objetos Libro que representan los libros encontrados.
   */
  private search(queryParams: string){

    if (!queryParams || queryParams.trim() === '') {//TODO afinarlo
      // Si queryParams está vacío o solo contiene espacios en blanco, no realizar la solicitud
      alert("Es necesario introducir un nombre o palabra clave");
      queryParams="Sanderson";
      //return of(null); // o puedes devolver un observable vacío o un valor predeterminado según tus necesidades
    }

    // Configurar encabezados para la solicitud HTTP
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Reemplaza con la URL correcta del servidor Express.js
    });

    const options = { headers };

    // Construir la URL de la solicitud utilizando los parámetros de consulta
    const url = `${this.urlLista}?q=${queryParams}`;
    console.log("getAll"+url + " - "+ options);

    //Realizar la solicitud HTTP a la API de Google Books y obtener una respuesta en formato JSON
    const jsonRespuesta: Observable<BookVolumes> = this.http.get<BookVolumes>(url, options);

    // Transformar la respuesta JSON en un arreglo de objetos Libro utilizando la función fromJsonToLibroArray
    return fromJsonToLibroArray(jsonRespuesta);
  }

  /**
   *  Metodo público que se utilizará en otros componentes o servicios para obtener una lista de libros en función de ciertos parámetros
   * @param queryParams 
   * @returns 
   */
  getAll(queryParams: string, maxResult?: number, orderby?: string): Observable<Libro[]> {
    if(maxResult){
      queryParams += "&maxResults="+maxResult;
    }
    if(orderby){
      queryParams += "&orderby="+orderby;
    }
    return this.search(queryParams);
  }

  getAuthor(queryParams: string):  Observable<Libro[]> {
    queryParams = "inauthor:"+queryParams;
    return this.search(queryParams);
  }

  getTitle(queryParams: string):  Observable<Libro[]> {
    queryParams = "intitle:"+queryParams;
    return this.search(queryParams);
  }

  /*************************************************DETALLE LIBRO*************************************************************** */

  /**
   *  Realiza una solicitud HTTP a la API de Google Books - DETALLE LIBRO
   * @param idLibro Parámetros de consulta utilizados para buscar libros en la API.
   * @returns Un observable que emite un objetos Libro
   */
  private searchLibro(idLibro: string | undefined){

    if (!idLibro || idLibro.trim() === '') {//TODO afinarlo
      // Si queryParams está vacío o solo contiene espacios en blanco, no realizar la solicitud
      alert("Es necesario introducir un nombre o palabra clave");
      idLibro="Sanderson";
      //return of(null); // o puedes devolver un observable vacío o un valor predeterminado según tus necesidades
    }

    // Configurar encabezados para la solicitud HTTP
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Reemplaza con la URL correcta del servidor Express.js
    });

    const options = { headers };

    // Construir la URL de la solicitud utilizando los parámetros de consulta
    const url = `${this.urlDetalle}?idLibro=${idLibro}`;
    console.log("DETALLELIBRO: "+url + " - "+ options);

    //Realizar la solicitud HTTP a la API de Google Books y obtener una respuesta en formato JSON
    const jsonRespuesta: Observable<VolumeItem> = this.http.get<VolumeItem>(url, options);

    // Transformar la respuesta JSON en un arreglo de objetos Libro utilizando la función fromJsonToLibroArray
    return fromJsonToLibro(jsonRespuesta);
  }

  getDetalleLibro(idLibro: string | undefined):  Observable<Libro> {
    
    return this.searchLibro(idLibro);
  }

}
/**
 * En general, esta estructura te permite mantener un código limpio y modular, 
 * ya que separa la lógica de transformación de datos en app-utils.ts y la lógica de interacción con la API en google-books.service.ts. 
 * Esto facilita la reutilización de la función de transformación en otros lugares si es necesario.
 */
