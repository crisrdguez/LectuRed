// Este servicio gestiona el estado del buscador, proporcionando métodos para establecer y obtener los parámetros de búsqueda.
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor() { }

  //queryParamsSubject y opcionBusquedaSubject son instancias de BehaviorSubject, que son observables especiales de RxJS que pueden emitir valores iniciales y posteriores a sus suscriptores. 
  //se utilizan para mantener el estado actual de queryparams y opcionBusqueda

  // BehaviorSubject para mantener el estado actual de los parámetros de búsqueda.
  private queryParamsSubject = new BehaviorSubject<string>('');
  // BehaviorSubject para mantener el estado actual de la opción de búsqueda.
  private opcionBusquedaSubject = new BehaviorSubject<number>(0);

/**
 * Establece los parámetros de búsqueda actuales utilizando el método .next() del BehaviorSubject.
 * @param queryParams Parámetros de búsqueda a establecer
 */
  setQueryParams(queryParams: string) {
    this.queryParamsSubject.next(queryParams);
  }

  /**
   * Obtiene un Observable que emite los parámetros de búsqueda actuales.
   * @returns Observable de tipo string con los parámetros de búsqueda actuales.
   */
  getQueryParams(): Observable<string> {
    return this.queryParamsSubject.asObservable();
  }

  /**
   * Establece la opción de búsqueda actual.
   * @param opcionBusqueda - Opción de búsqueda a establecer.
   */
  setOpcionBusqueda(opcionBusqueda: number) {
    this.opcionBusquedaSubject.next(opcionBusqueda);
  }

  /**
   * Obtiene un Observable que emite la opción de búsqueda actual.
   * @returns Observable de tipo number con la opción de búsqueda actual.
   */
  getOpcionBusqueda(): Observable<number> {
    return this.opcionBusquedaSubject.asObservable();
  }
}