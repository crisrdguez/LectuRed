//Clase de utilidades
import { Libro } from "src/app/core/models/libro.model";
import {BookVolumes, VolumeItem}  from '../../core/models/libro.interface';
import { Observable, map } from 'rxjs';

/**
 * Toma un Observable de tipo BookVolumes y lo transforma en un Observable de tipo Libro[]
 * La función utiliza el operador pipe de RxJS y el operador map para realizar esta transformación
 * @param jsonRespuesta de tipo BookVolumes (observable de respuesta JSON)
 * @returns Observable de tipo Libro[] (observable de arreglo de objetos Libro)
 */
export function fromJsonToLibroArray(jsonRespuesta:Observable<BookVolumes>): Observable<Libro[]>{

    return jsonRespuesta.pipe(
        map((response: BookVolumes) => {
            const listaLibros: Libro[] = [];
            if (response.items) {
                response.items.forEach(item => {
                    const libro: Libro = new Libro();
                    //Uso los metodos set de la clase Libro
                        libro.id = item.id;
                        libro.title = item.volumeInfo?.title || '';
                        libro.authors = item.volumeInfo?.authors || [];
                        libro.thumbnail= item.volumeInfo?.imageLinks?.thumbnail || ''
                   
                    listaLibros.push(libro);
                });
            }
            return listaLibros; // Retorna el arreglo de objetos Libro como resultado de la transformación
        })
    );
}

/**
 * Toma un Observable de tipo BookVolumes y lo transforma en un Observable de tipo Libro[]
 * La función utiliza el operador pipe de RxJS y el operador map para realizar esta transformación
 * @param jsonRespuesta de tipo BookVolumes (observable de respuesta JSON)
 * @returns Observable de tipo Libro[] (observable de arreglo de objetos Libro)
 */
export function fromJsonToLibro(jsonRespuesta: Observable<VolumeItem>): Observable<Libro> {
    return jsonRespuesta.pipe(
      map((response: VolumeItem) => {
          const volumeInfo = response.volumeInfo;
          const libro: Libro = new Libro(); 
            libro.id = response.id;
            libro.title = volumeInfo.title;
            libro.authors = volumeInfo.authors || [];
            libro.thumbnail = volumeInfo.imageLinks?.thumbnail || '';
            libro.subtitle = volumeInfo.subtitle;
            libro.publisher = volumeInfo.publisher;
            libro.description = volumeInfo.description;
          
          return libro; // Retorna el objeto Libro como resultado de la transformación
        
      })
    );

}

//todo fromjsontoactividad[]