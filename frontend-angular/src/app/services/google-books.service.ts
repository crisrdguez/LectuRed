//Servicio que se utiliza para hacer peticiones a la API de Google Books y transforma las respuestas en objetos Libro
/**
   * ACLARACION
   * las solicitudes HTTP son asincrónicas, 
   * por lo que debes manejar la respuesta de manera asincrónica y, 
   * en lugar de devolver directamente un Libro[] desde el método getAll, 
   * se usa un observable para que el cliente pueda suscribirse a los resultados una vez que estén disponibles
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
      // alert("Es necesario introducir un nombre o palabra clave");
      //queryParams="Sanderson";
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
   * Método que se utilizará en otros componentes o servicios
   * para obtener una lista de libros en función de ciertos parámetros.
   * @param queryParams - Parámetros de consulta utilizados para buscar libros en la API.
   * @param maxResult - Número máximo de resultados a obtener (opcional).
   * @param orderby - Criterio de ordenación de los resultados (opcional).
   * @returns Observable que emite un arreglo de objetos Libro que representan los libros encontrados.
   */
  getAll(queryParams: string, maxResult?: number, orderby?: string): Observable<Libro[]> {
    
    if(maxResult){
      queryParams += "&maxResults="+maxResult;
    }
    if(orderby){
      queryParams += "&orderby="+orderby;
    }
    console.log("desde getall de GoogleBooksService");
    return this.search(queryParams);
  }

  /**
   * Método para obtener una lista de libros de un autor específico.
   * @param queryParams - Nombre del autor.
   * @param maxResult - Número máximo de resultados a obtener (opcional).
   * @param orderby - Criterio de ordenación de los resultados (opcional).
   * @returns Observable que emite un arreglo de objetos Libro que representan los libros del autor.
   */
  getAuthor(queryParams: string, maxResult?: number, orderby?: string):  Observable<Libro[]> {
    if(maxResult){
      queryParams += "&maxResults="+maxResult;
    }
    if(orderby){
      queryParams += "&orderby="+orderby;
    }
    queryParams = "inauthor:"+queryParams;
    console.log("desde getautor de GoogleBooksService");
    return this.search(queryParams);
  }

  /**
   * Método para obtener una lista de libros con un título específico.
   * @param queryParams - Título del libro.
   * @returns Observable que emite un arreglo de objetos Libro que representan los libros con el título específico.
   */
  getTitle(queryParams: string):  Observable<Libro[]> {
    queryParams = "intitle:"+queryParams;
    console.log("desde intitle de GoogleBooksService");
    return this.search(queryParams);
  }

  /**
   * Método para obtener una lista de libros de una categoría específica.
   * @param queryParams - Categoría de los libros.
   * @returns Observable que emite un arreglo de objetos Libro que representan los libros de la categoría.
   */
  getSubject(queryParams: string): Observable<Libro[]>{
    queryParams = "subject:"+queryParams;
    console.log("desde subject de GoogleBooksService");
    return this.search(queryParams);
  }

  /**
   * Método para obtener una lista de novedades.
   * @param queryParams - Nombre del autor, título o palabra clave.
   * @param maxResult - Número máximo de resultados a obtener (opcional).
   * @param orderby - Criterio de ordenación de los resultados (opcional).
   * @returns Observable que emite un arreglo de objetos Libro que representan las novedades.
   */
  getNews(queryParams: string, maxResult?: number, orderby?: string): Observable<Libro[]> {
    queryParams = "inauthor:"+queryParams;
    if(maxResult){
      queryParams += "&maxResults="+maxResult;
    }
    if(orderby){
      queryParams += "&orderby="+orderby;
    }
    console.log("desde getall de GoogleBooksService");
    return this.search(queryParams);
  }

  /*************************************************DETALLE LIBRO*************************************************************** */

  /**
   * Realiza una solicitud HTTP a la API de Google Books para obtener detalles de un libro.
   * @param idLibro - ID del libro.
   * @returns Un observable que emite un objeto Libro que representa los detalles del libro.
   */
  private searchLibro(idLibro: string | undefined){

    if (!idLibro || idLibro.trim() === '') {//TODO afinarlo
      // Si queryParams está vacío o solo contiene espacios en blanco, no realizar la solicitud
      // alert("Es necesario introducir un nombre o palabra clave");
      //return of(null); // o puedes devolver un observable vacío o un valor predeterminado según tus necesidades
    }

    // Configurar encabezados para la solicitud HTTP
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Reemplaza con la URL correcta del servidor Express.js
    });

    const options = { headers };

    // Construir la URL de la solicitud utilizando los parámetros de consulta
    let url = `${this.urlDetalle}?idLibro=${idLibro}`;
    console.log("DETALLELIBRO: "+url + " - "+ options);

    //Realizar la solicitud HTTP a la API de Google Books y obtener una respuesta en formato JSON
    const jsonRespuesta: Observable<VolumeItem> = this.http.get<VolumeItem>(url, options);
    console.log(url);

    // Transformar la respuesta JSON en un objeto Libro utilizando la función fromJsonToLibro
    return fromJsonToLibro(jsonRespuesta);
  }

  /**
   * Método que se utilizará en otros componentes o servicios
   * para obtener los detalles de un libro en función de su ID.
   * @param idLibro - ID del libro.
   * @returns Observable que emite un objeto Libro que representa los detalles del libro.
   */
  getDetalleLibro(idLibro: string | undefined):  Observable<Libro> {  
    return this.searchLibro(idLibro);
  }


}
