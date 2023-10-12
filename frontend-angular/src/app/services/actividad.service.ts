import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  jsonURL = 'assets/mock/actividad.json'; // Ruta al archivo JSON


  constructor(private http: HttpClient) { }

  getCriticas(): Observable<any> {
    return this.http.get(this.jsonURL);
  }

  
}
